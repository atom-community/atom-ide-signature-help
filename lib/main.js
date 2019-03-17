'use babel';

const { CompositeDisposable, Disposable } = require('atom');
const SignatureHelpManager = require('./signature-help-manager');

module.exports = {

  /**
   * [subscriptions description]
   * @type {CompositeDisposable}
   */
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

    require('atom-package-deps').install('atom-ide-signature-help')
      .then(function() {
        console.log('All dependencies installed, good to go')
      });
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
  },

  consumeMarkdownRenderer(renderer) {
    this.signatureHelpManager.initialize(renderer);
  }
};
