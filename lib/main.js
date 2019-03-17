'use babel';

const { CompositeDisposable } = require('atom');
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

  /**
   * [renderer description]
   * @type {[type]}
   */
  renderer: null,

  /**
   * called by Atom when activating an extension
   * @param  {[type]} state [description]
   */
  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    if (!this.signatureHelpManager) this.signatureHelpManager = new SignatureHelpManager();
    this.subscriptions.add(this.signatureHelpManager);

    require('atom-package-deps').install('atom-ide-signature-help').then(() => {
      this.signatureHelpManager.initialize(this.renderer);
    });
  },

  /**
   * called by Atom when deactivating an extension
   */
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
    this.renderer = renderer;
  }
};
