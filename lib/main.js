// @ts-check
/// <reference path="../typings/atom-ide.d.ts"/>
'use babel';

const { CompositeDisposable, Disposable } = require('atom');
const SignatureHelpManager = require('./signature-help-manager');

module.exports = {

  subscriptions: null,
  /**
   * [signatureHelpManager description]
   * @type {SignatureHelpManager}
   */
  signatureHelpManager: null,

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    if (!this.signatureHelpManager) this.signatureHelpManager = new SignatureHelpManager();
    this.subscriptions.add(this.signatureHelpManager);
    this.signatureHelpManager.initialize();
  },

  deactivate() {
    if (this.subscriptions) {
      this.subscriptions.dispose();
    }
    this.subscriptions = null;
  },

  /**
   * [provideDatatipService description]
   * @return {AtomIDE.SignatureHelpRegistry} [description]
   */
  provideSignatureHelp() {
    return (provider) => {
      return this.signatureHelpManager.addProvider(provider);
    }
  }
};
