'use babel';

const { CompositeDisposable, Disposable, Range, Point, TextEditor } = require('atom');
const ProviderRegistry = require('./provider-registry');
const SignatureHelpView = require('./signature-help-view');

module.exports = class SignatureHelpManager {

  constructor() {
    /**
     * [subscriptions description]
     * @type {CompositeDisposable}
     */
    this.subscriptions = new CompositeDisposable();
    /**
     * [providerRegistry description]
     * @type {ProviderRegistry}
     */
    this.providerRegistry = new ProviderRegistry();
    /**
     * [watchedEditors description]
     * @type {Array<TextEditor>}
     */
    this.watchedEditors = new WeakSet();
    /**
     * [editor description]
     * @type {TextEditor}
     */
    this.editor = null;
    /**
     * [editorView description]
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
    /**
     * [renderer description]
     * @type {[type]}
     */
    this.renderer = null;
  }

  initialize(renderer) {
    this.renderer = renderer;

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
    let focusListener = () => this.updateCurrentEditor(editor);
    editorView.addEventListener('focus', focusListener);
    let blurListener = () => this.unmountDataTip();
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
    this.unmountDataTip();
    this.editor = null;
    this.editorView = null;

    if (!atom.workspace.isTextEditor(editor)) { return; }

    this.editor = editor;
    this.editorView = atom.views.getView(this.editor);

    this.editorSubscriptions = new CompositeDisposable();

    if (!this.showSignatureHelpOnTyping) { return; }

    this.editor.getElement().addEventListener("keydown", (evt) => {
      if (evt.keyCode === 27) {
        this.unmountDataTip();
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
              return this.unmountDataTip();
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
  async showDataTip(provider, editor, position) {
    try {
     const signatureHelp = await provider.getSignatureHelp(editor, position);

     if ((!signatureHelp) || (signatureHelp.signatures.length == 0)) {
       this.unmountDataTip();
     } else {
      const index = signatureHelp.activeSignature || 0;
      const signature = signatureHelp.signatures[index];

      // clear last data tip
      this.unmountDataTip();

      const grammar = editor.getGrammar().name.toLowerCase();
      const htmlString = this.makeHtmlFromSignature(signature, grammar);
      const html = await this.renderer.render(htmlString, grammar);
      const signatureHelpView = new SignatureHelpView({ htmlView: html });
      this.signatureHelpDisposables = this.mountSignatureHelp(editor, position, signatureHelpView);
    }
    } catch (err) {
      console.error(err);
    }
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
   * [unmountDataTip description]
   */
  unmountDataTip () {
    if (this.signatureHelpDisposables) {
      this.signatureHelpDisposables.dispose();
    }
    this.signatureHelpDisposables = null;
  }

  /**
   * [makeHtmlFromMarkedStrings description]
   * @param  {AtomIDE.Signature} markedStrings   [description]
   * @param  {String} grammarName [description]
   * @return {String}          [description]
   */
  makeHtmlFromSignature(signature, grammarName) {
    let result = [];

    const preElem = document.createElement('pre');
    const codeElem = document.createElement('code');
    codeElem.classList.add(grammarName);
    codeElem.innerText = signature.label;
    preElem.appendChild(codeElem);

    result.push(preElem.outerHTML);

    if (signature.documentation) {
      const markdownDoc = signature.documentation.kind ? signature.documentation.value : signature.documentation;
      result.push(`<p>${markdownDoc}</p>`);
    }

    return result.join('');
  }
}
