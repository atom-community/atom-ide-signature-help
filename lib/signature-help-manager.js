// @ts-check
/// <reference path="../typings/atom-ide.d.ts"/>
'use babel';

const { CompositeDisposable, Disposable, Point, Range, TextEditor } = require('atom');
const ProviderRegistry = require('./provider-registry');
const SignatureHelpView = require('./signature-help-view');

module.exports = class SignatureHelpManager {

  constructor() {
    /**
     * [subscriptions description]
     * @type {CompositeDisposable}
     */
    this.subscriptions = null;
    /**
     * [providerRegistry description]
     * @type {ProviderRegistry}
     */
    this.providerRegistry = null;
    /**
     * [watchedEditors description]
     * @type {Array<TextEditor>}
     */
    this.watchedEditors = null;
    /**
     * [editor description]
     * @type {TextEditor}
     */
    this.editor = null;
    /**
     * [editorView description]
     * @type {object}
     */
    this.editorView = null;
    /**
     * [editorSubscriptions description]
     * @type {CompositeDisposable}
     */
    this.editorSubscriptions = null;
    /**
     * [signatureHelpDisposables description]
     * @type {CompositeDisposable}
     */
    this.signatureHelpDisposables = null;
    /**
     * [showSignatureHelpOnTyping description]
     * @type {Boolean}
     */
    this.showSignatureHelpOnTyping = false;
  }

  initialize() {
    this.subscriptions = new CompositeDisposable();
    this.providerRegistry = new ProviderRegistry();
    this.watchedEditors = new WeakSet();

    this.subscriptions.add(
      atom.workspace.observeTextEditors(editor => {
        const disposable = this.watchEditor(editor);
        editor.onDidDestroy(() => disposable.dispose());
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-text-editor', {
        'signature-help:show': (evt) => {
          const editor = evt.currentTarget.getModel();
          const provider = this.providerRegistry.getProviderForEditor(editor);
          const position = editor.getLastCursor().getBufferPosition();
          if (provider) {
            this.showDataTip(provider, editor, position);
          }
        }
      }),
      atom.config.observe('atom-ide-signature-help.showSignatureHelpOnTyping', toggleSwitch => {
        this.showSignatureHelpOnTyping = toggleSwitch;
        // forces update of internal editor tracking
        const editor = this.editor;
        this.editor = null;
        this.updateCurrentEditor(editor);
      })
    );
  }

  dispose() {
    if (this.signatureHelpDisposables) {
        this.signatureHelpDisposables.dispose();
    }
    this.signatureHelpDisposables = null;

    if (this.editorSubscriptions) {
      this.editorSubscriptions.dispose();
    }
    this.editorSubscriptions = null;

    if (this.subscriptions) {
      this.subscriptions.dispose();
    }
    this.subscriptions = null;
  }

    /**
   * [addProvider description]
   * @param {AtomIDE.SignatureHelpProvider} provider [description]
   * @returns {Disposable}
   */
  addProvider (provider) {
    return this.providerRegistry.addProvider(provider);
  }

  /**
   * [watchEditor description]
   * @param  {TextEditor} editor [description]
   * @return {Disposable | null}        [description]
   */
  watchEditor (editor) {
    if (this.watchedEditors.has(editor)) { return; }
    let editorView = atom.views.getView(editor);
    if (editorView.hasFocus()) {
      this.updateCurrentEditor(editor);
    }
    let focusListener = (element) => this.updateCurrentEditor(editor);
    editorView.addEventListener('focus', focusListener);
    let blurListener = (element) => this.hideDataTip();
    editorView.addEventListener('blur', blurListener);

    let disposable = new Disposable(() => {
      editorView.removeEventListener('focus', focusListener);
      editorView.removeEventListener('blur', blurListener);
      if (this.editor === editor) {
        this.updateCurrentEditor(null);
      }
    });

    this.watchedEditors.add(editor);
    this.subscriptions.add(disposable);

    return new Disposable(() => {
      disposable.dispose();
      if (this.subscriptions != null) {
        this.subscriptions.remove(disposable);
      }
      this.watchedEditors.delete(editor);
    });
  }

  /**
   * [updateCurrentEditor description]
   * @param  {TextEditor} editor [description]
   */
  updateCurrentEditor (editor) {
    if (editor === this.editor) { return; }
    if (this.editorSubscriptions) {
      this.editorSubscriptions.dispose();
    }
    this.editorSubscriptions = null;

    if (this.signatureHelpDisposables) {
      this.signatureHelpDisposables.dispose();
    }
    this.signatureHelpDisposables = null;

    // Stop tracking editor + buffer
    this.hideDataTip();
    this.editor = null;
    this.editorView = null;

    if (!atom.workspace.isTextEditor(editor)) { return; }

    this.editor = editor;
    this.editorView = atom.views.getView(this.editor);

    this.editorSubscriptions = new CompositeDisposable();

    if (!this.showSignatureHelpOnTyping) { return; }

    this.editor.getElement().addEventListener("keydown", (evt) => {
      if (evt.keyCode === 27) {
        this.hideDataTip();
      }
    });

    this.editorSubscriptions.add(
      this.editor.getBuffer().onDidChangeText(evt => {

        if (evt.changes.length != 1) { return; }

        const change = evt.changes[0];
        // Use the start of the current selection as the cursor position.
        // (Autocomplete often inserts a placeholder and puts the cursor at the end.)
        const cursorPosition = editor.getSelectedBufferRange().start;

        if ((change.newText.length === 0) ||
            // Don't allow multi-line changes.
            (change.newRange.start.row !== change.newRange.end.row) ||
            // The change should cover the current cursor position.
            (!change.newRange.containsPoint(cursorPosition))) {
              return;
        }
        // Use the character before the cursor as the 'trigger character'.
        const index = Math.max(0, cursorPosition.column - change.newRange.start.column - 1);

        const provider = this.providerRegistry.getProviderForEditor(this.editor);

        if (!provider) { return; }

        if (provider.triggerCharacters.has(change.newText[index])) {
          this.showDataTip(provider, this.editor, cursorPosition);
        }
    }))
  }

  /**
   * [showDataTip description]
   * @param  {AtomIDE.SignatureHelpProvider} provider [description]
   * @param  {TextEditor} editor   [description]
   * @param  {Point} position [description]
   */
  showDataTip(provider, editor, position) {
    provider.getSignatureHelp(editor, position)
        .then((result) => {
          this.hideDataTip();

          if ((result === null) || (result.signatures.length === 0)) { return; }

          const index = result.activeSignature || 0;
          const signature = result.signatures[index];
          const signatureHelpView = new SignatureHelpView({ signature: signature, grammar: editor.getGrammar() });
          this.signatureHelpDisposables = this.mountSignatureHelp(editor, position, signatureHelpView);
        })
  }

  /**
   * [mountSignatureHelp description]
   * @param  {TextEditor} editor   [description]
   * @param  {Point} position [description]
   * @param  {SignatureHelpView} view     [description]
   * @return {CompositeDisposable}          [description]
   */
  mountSignatureHelp(editor, position, view) {
    let disposables = new CompositeDisposable();

    const overlayMarker = editor.markBufferRange(new Range(position, position), {
      invalidate: 'never',
    });

    const marker = editor.decorateMarker(overlayMarker, {
      type: 'overlay',
      class: 'datatip-overlay',
      position: 'head',
      item: view.element,
    });

    view.element.style.display = 'block';
    // move box above the current editing line 
    setTimeout(() => {
      view.element.style.bottom = editor.getLineHeightInPixels() + view.element.getBoundingClientRect().height + 'px';
    }, 100);

    disposables.add(
      new Disposable(() => overlayMarker.destroy()),
      new Disposable(() => view.destroy()),
      new Disposable(() => marker.destroy())
    );

    return disposables;
  }

  /**
   * [hideDataTip description]
   */
  hideDataTip () {
    if (this.signatureHelpDisposables) {
      this.signatureHelpDisposables.dispose();
    }
    this.signatureHelpDisposables = null;
  }
}
