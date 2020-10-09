"use babel"

// @ts-check

const { CompositeDisposable } = require("atom")
const SignatureHelpManager = require("./signature-help-manager")

/**
 * the Atom IDE signature help plugin
 * @type {Object}
 */
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
   * called by Atom when activating an extension
   * @param  {any} state the current state of atom
   */
  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()
    if (!this.signatureHelpManager) this.signatureHelpManager = new SignatureHelpManager()
    this.subscriptions.add(this.signatureHelpManager)
    require("atom-package-deps")
      .install("atom-ide-signature-help")
      .then(() => {
        this.signatureHelpManager.initialize(this.renderer)
      })
  },

  /**
   * called by Atom when deactivating an extension
   */
  deactivate() {
    if (this.subscriptions) {
      this.subscriptions.dispose()
    }
    this.subscriptions = null
    this.signatureHelpManager = null
  },

  /**
   * [provideDatatipService description]
   * @return {AtomIDE.SignatureHelpRegistry} [description]
   */
  provideSignatureHelp() {
    return this.signatureHelpManager.signatureHelpRegistry
  },

  config: {
    showSignatureHelpOnTyping: {
      title: "Show signature automatically",
      description:
        "If set to true, the signature help is shown as soon as you start typing. Otherwise you will have to activate it via keypress.",
      type: "boolean",
      default: true,
    },
    glowOnHover: {
      title: "Glow on hover",
      description: "Should signature glow when you hover on it?",
      type: "boolean",
      default: true,
    },
  },
}
