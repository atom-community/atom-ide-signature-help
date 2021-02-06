import { CompositeDisposable } from "atom"
import { SignatureHelpManager } from "./signature-help-manager"
import { SignatureHelpRegistry } from "atom-ide-base"

let subscriptions: CompositeDisposable
let signatureHelpManager: SignatureHelpManager

/**
 * called by Atom when activating an extension
 */
export function activate() {
  // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
  subscriptions = new CompositeDisposable()
  if (!signatureHelpManager) signatureHelpManager = new SignatureHelpManager()
  subscriptions.add(signatureHelpManager)
  require("atom-package-deps")
    .install("atom-ide-signature-help")
    .then(() => {
      signatureHelpManager.initialize()
    })
}

/**
 * called by Atom when deactivating an extension
 */
export function deactivate() {
  if (subscriptions) {
    subscriptions.dispose()
  }
}

export function provideSignatureHelp(): SignatureHelpRegistry {
  return signatureHelpManager.signatureHelpRegistry
}

export const config = {
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
}
