// @ts-check
/// <reference path="../typings/atom-ide.d.ts"/>
'use babel';

const { CompositeDisposable, Disposable, Point, Range, TextEditor } = require('atom');
const ProviderRegistry = require('./provider-registry');

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
          const provider = this.providerRegistry.getProviderForEditor(this.editor);
          const position = this.editor.getLastCursor().getBufferPosition();
          this.showDataTip(provider, this.editor, position);
        }
      })
    );

    this.watchEditor(atom.workspace.getActiveTextEditor());
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
    console.log(provider);
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
    this.editor = null;
    this.editorView = null;

    if (!atom.workspace.isTextEditor(editor)) { return; }

    this.editor = editor;
    this.editorView = atom.views.getView(this.editor);

    this.editorSubscriptions = new CompositeDisposable();

    const provider = this.providerRegistry.getProviderForEditor(this.editor);
    if (provider) {
      this.editorSubscriptions.add(
        this.editor.getBuffer().onDidChangeText(evt => {

          const change = evt.changes[0];
          // Use the start of the current selection as the cursor position.
          // (Autocomplete often inserts a placeholder and puts the cursor at the end.)
          const cursorPosition = editor.getSelectedBufferRange().start;

          if ((change.newText.length === 0) ||
              (!change.newRange.containsPoint(cursorPosition))) {
                return;
          }
          // Use the character before the cursor as the 'trigger character'.
          const index = Math.max(0, cursorPosition.column - change.newRange.start.column - 1);
          if (provider.triggerCharacters.has(change.newText[index])) {
            this.showDataTip(provider, this.editor, cursorPosition);
          }
        })
      )
    }
  }

  showDataTip(provider, editor, position) {
    provider.getSignatureHelp(editor, position)
        .then((result) => {
          console.log(result);
        })
  }
  /**
   * [hideDataTip description]
   * @param  {[type]} evt [description]
   */
  hideDataTip (evt) {
    if (this.signatureHelpDisposables) {
      this.signatureHelpDisposables.dispose();
    }
  }
}
