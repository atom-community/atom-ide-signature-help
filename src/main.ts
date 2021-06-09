import { CompositeDisposable } from "atom"
import { SignatureHelpManager } from "./signature-help-manager"
import { SignatureHelpRegistry } from "atom-ide-base"

const subscriptions = new CompositeDisposable()
let signatureHelpManager: SignatureHelpManager

/** Called by Atom when activating an extension */
export function activate() {
  // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
  signatureHelpManager = new SignatureHelpManager()
  subscriptions.add(signatureHelpManager)

  installPackageDeps()
    .then(() => {
      signatureHelpManager.initialize()
    })
    .catch((e) => {
      atom.notifications.addError(e)
    })
}

async function installPackageDeps() {
  if (!atom.packages.isPackageLoaded("busy-signal")) {
    await (await import("atom-package-deps")).install("atom-ide-signature-help", true)
  }
}

/** Called by Atom when deactivating an extension */
export function deactivate() {
  subscriptions.dispose()
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
}
