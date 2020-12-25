"use babel"

// @ts-check

const { CompositeDisposable, Disposable, Range, Point, TextEditor } = require("atom")
import { ProviderRegistry } from "atom-ide-base/commons-atom/ProviderRegistry"
import { ViewContainer } from "atom-ide-base/commons-ui/float-pane/ViewContainer"

module.exports = class SignatureHelpManager {
  constructor() {
    /**
     * holds a reference to disposable items from this data tip manager
     * @type {CompositeDisposable}
     */
    this.subscriptions = new CompositeDisposable()
    /**
     * holds a list of registered data tip providers
     * @type {ProviderRegistry}
     */
    this.providerRegistry = new ProviderRegistry()
    /**
     * holds a weak reference to all watched Atom text editors
     * @type {Array<TextEditor>}
     */
    this.watchedEditors = new WeakSet()
    /**
     * holds a reference to the current watched Atom text editor
     * @type {TextEditor}
     */
    this.editor = null
    /**
     * holds a reference to the current watched Atom text editor viewbuffer
     */
    this.editorView = null
    /**
     * holds a reference to all disposable items for the current watched Atom text editor
     * @type {CompositeDisposable}
     */
    this.editorSubscriptions = null
    /**
     * holds a reference to all disposable items for the current signature help
     * @type {CompositeDisposable}
     */
    this.signatureHelpDisposables = null
    /**
     * config flag denoting if the signature help should be shown during typing automatically
     * @type {Boolean}
     */
    this.showSignatureHelpOnTyping = false

    // glow on hover class
    this.glowClass = atom.config.get("atom-ide-signature-help.glowOnHover") ? "signature-glow" : ""
  }

  /**
   * initialization routine
   */
  initialize() {
    this.subscriptions.add(
      atom.workspace.observeTextEditors((editor) => {
        const disposable = this.watchEditor(editor)
        editor.onDidDestroy(() => disposable.dispose())
      }),
      atom.commands.add("atom-text-editor", {
        "signature-help:show": (evt) => {
          const editor = evt.currentTarget.getModel()
          if (atom.workspace.isTextEditor(editor)) {
            const provider = this.providerRegistry.getProviderForEditor(editor)
            const position = editor.getLastCursor().getBufferPosition()
            if (provider) {
              this.showSignatureHelp(provider, editor, position)
            }
          }
        },
      }),
      atom.config.observe("atom-ide-signature-help.showSignatureHelpOnTyping", (toggleSwitch) => {
        this.showSignatureHelpOnTyping = toggleSwitch
        // forces update of internal editor tracking
        const editor = this.editor
        this.editor = null
        this.updateCurrentEditor(editor)
      })
    )
  }

  /**
   * dispose function to clean up any disposable references used
   */
  dispose() {
    if (this.signatureHelpDisposables) {
      this.signatureHelpDisposables.dispose()
    }
    this.signatureHelpDisposables = null

    if (this.editorSubscriptions) {
      this.editorSubscriptions.dispose()
    }
    this.editorSubscriptions = null

    if (this.subscriptions) {
      this.subscriptions.dispose()
    }
    this.subscriptions = null
  }

  /**
   * returns the provider registry as a consumable service
   * @return {AtomIDE.SignatureHelpRegistry} [description]
   */
  get signatureHelpRegistry() {
    return (provider) => {
      return this.providerRegistry.addProvider(provider)
    }
  }

  /**
   * checks and setups an Atom Text editor instance for tracking cursor/mouse movements
   * @param  {TextEditor} editor  a valid Atom Text editor instance
   */
  watchEditor(editor) {
    if (this.watchedEditors.has(editor)) {
      return
    }
    let editorView = atom.views.getView(editor)
    if (editorView.hasFocus()) {
      this.updateCurrentEditor(editor)
    }
    let focusListener = () => this.updateCurrentEditor(editor)
    editorView.addEventListener("focus", focusListener)
    let blurListener = () => this.unmountDataTip()
    editorView.addEventListener("blur", blurListener)

    let disposable = new Disposable(() => {
      editorView.removeEventListener("focus", focusListener)
      editorView.removeEventListener("blur", blurListener)
      if (this.editor === editor) {
        this.updateCurrentEditor(null)
      }
    })

    this.watchedEditors.add(editor)
    this.subscriptions.add(disposable)

    return new Disposable(() => {
      disposable.dispose()
      if (this.subscriptions != null) {
        this.subscriptions.remove(disposable)
      }
      this.watchedEditors.delete(editor)
    })
  }

  /**
   * updates the internal references to a specific Atom Text editor instance in case
   * it has been decided to track this instance
   * @param  {TextEditor} editor the Atom Text editor instance to be tracked
   */
  updateCurrentEditor(editor) {
    if (editor === this.editor) {
      return
    }
    if (this.editorSubscriptions) {
      this.editorSubscriptions.dispose()
    }
    this.editorSubscriptions = null

    // Stop tracking editor + buffer
    this.unmountDataTip()
    this.editor = null
    this.editorView = null

    if (!atom.workspace.isTextEditor(editor)) {
      return
    }

    this.editor = editor
    this.editorView = atom.views.getView(this.editor)

    this.editorSubscriptions = new CompositeDisposable()

    if (!this.showSignatureHelpOnTyping) {
      return
    }

    this.editor.getElement().addEventListener("keydown", (evt) => {
      if (evt.keyCode === 27) {
        this.unmountDataTip()
      }
    })

    this.editorSubscriptions.add(
      this.editor.getBuffer().onDidChangeText((evt) => {
        if (evt.changes.length != 1) {
          return
        }

        const change = evt.changes[0]
        // Use the start of the current selection as the cursor position.
        // (Autocomplete often inserts a placeholder and puts the cursor at the end.)
        const cursorPosition = editor.getSelectedBufferRange().start

        if (
          change.newText.length === 0 ||
          // Don't allow multi-line changes.
          change.newRange.start.row !== change.newRange.end.row ||
          // The change should cover the current cursor position.
          !change.newRange.containsPoint(cursorPosition)
        ) {
          return this.unmountDataTip()
        }
        // Use the character before the cursor as the 'trigger character'.
        const index = Math.max(0, cursorPosition.column - change.newRange.start.column - 1)

        const provider = this.providerRegistry.getProviderForEditor(this.editor)

        if (!provider) {
          return
        }

        if (provider.triggerCharacters.has(change.newText[index])) {
          this.showSignatureHelp(provider, this.editor, cursorPosition)
        }
      })
    )
  }

  /**
   * [showSignatureHelp description]
   * @param  {AtomIDE.SignatureHelpProvider} provider [description]
   * @param  {TextEditor} editor   [description]
   * @param  {Point} position [description]
   */
  async showSignatureHelp(provider, editor, position) {
    try {
      const signatureHelp = await provider.getSignatureHelp(editor, position)

      if (!signatureHelp || signatureHelp.signatures.length == 0) {
        this.unmountDataTip()
      } else {
        const index = signatureHelp.activeSignature || 0
        const signature = signatureHelp.signatures[index]
        const paramIndex = signatureHelp.activeParameter || 0
        const parameter = signature.parameters[paramIndex] || null

        // clear last data tip
        this.unmountDataTip()

        const grammar = editor.getGrammar().scopeName.toLowerCase()
        let doc = null

        if (parameter) {
          doc = `<b>${parameter.label}</b> ${
            parameter.documentation && parameter.documentation.value
              ? parameter.documentation.value
              : parameter.documentation || ""
          }`
        } else if (signature.documentation) {
          doc = signature.documentation.kind ? signature.documentation.value : signature.documentation
        } else {
          doc = ""
        }
        const signatureHelpView = new ViewContainer({
          snippet: {
            snippet: signature.label,
            grammar: grammar,
            containerClassName: "signature-snippet-container",
            contentClassName: "signature-snippet",
          },
          markdown: {
            markdown: doc,
            grammar: grammar,
            containerClassName: "signature-markdown-container",
            contentClassName: "signature-markdown",
          },
          className: `signature-element ${this.glowClass}`,
        })
        this.signatureHelpDisposables = this.mountSignatureHelp(editor, position, signatureHelpView)
      }
    } catch (err) {
      console.error(err)
    }
  }

  /*
   * mounts displays a signature help view component at a specific position in a given Atom Text editor
   * @param  {TextEditor} editor   the Atom Text editor instance to host the data tip view
   * @param  {Point} position      the position on which to show the signature help view
   * @param  {SignatureHelpView} view    the signature help component to display
   * @return {CompositeDisposable}  a composite object to release references at a later stage
   */
  mountSignatureHelp(editor, position, view) {
    let disposables = new CompositeDisposable()
    const overlayMarker = editor.markBufferRange(new Range(position, position), {
      invalidate: "overlap", // TODO It was never. Shouldn't be surround?
    })

    const marker = editor.decorateMarker(overlayMarker, {
      type: "overlay",
      class: "signature-overlay",
      position: "head", // follows the cursor
      item: view.element,
    })

    //  TODO do this for some valid range
    // editor.onDidChangeCursorPosition(
    //   () => marker.destroy() // destroy the marker if user clicks somewhere else
    // )

    // move box above the current editing line
    // HACK: patch the decoration's style so it is shown above the current line
    setTimeout(() => {
      const overlay = view.element.parentElement
      if (!overlay) {
        return
      }
      const hight = view.element.getBoundingClientRect().height
      const lineHight = editor.getLineHeightInPixels()
      const availableHight = (position.row - editor.getFirstVisibleScreenRow()) * lineHight
      if (hight < availableHight + 80) {
        overlay.style.transform = `translateY(-${lineHight + hight}px)`
      } else {
        // move right so it does not overlap with auto-complete-list
        const autoCompleteList = editor.getElement().querySelector("autocomplete-suggestion-list")
        if (autoCompleteList) {
          overlay.style.transform = `translateX(${autoCompleteList.clientWidth}px)`
        } else {
          overlay.style.transform = "translateX(300px)"
        }
      }
      view.element.style.visibility = "visible"
    }, 100)

    disposables.add(
      new Disposable(() => overlayMarker.destroy()),
      new Disposable(() => view.destroy()),
      new Disposable(() => marker.destroy())
    )

    return disposables
  }

  /**
   * unmounts / hides the most recent data tip view component
   */
  unmountDataTip() {
    if (this.signatureHelpDisposables) {
      this.signatureHelpDisposables.dispose()
    }
    this.signatureHelpDisposables = null
  }
}
