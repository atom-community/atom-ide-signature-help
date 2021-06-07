import { CompositeDisposable, Disposable, Point, TextEditor, TextEditorElement } from "atom";
import { ProviderRegistry } from "atom-ide-base/commons-atom/ProviderRegistry";
import { ViewContainer } from "atom-ide-base/commons-ui/float-pane/ViewContainer";
import { SignatureHelpRegistry, SignatureHelpProvider } from "atom-ide-base";
export declare class SignatureHelpManager {
    subscriptions: CompositeDisposable;
    providerRegistry: ProviderRegistry<SignatureHelpProvider>;
    watchedEditors: WeakSet<TextEditor>;
    editor: TextEditor | null;
    editorView: TextEditorElement | null;
    editorSubscriptions: CompositeDisposable;
    signatureHelpDisposables: CompositeDisposable;
    showSignatureHelpOnTyping: boolean;
    initialize(): void;
    dispose(): void;
    get signatureHelpRegistry(): SignatureHelpRegistry;
    watchEditor(editor: TextEditor): Disposable | undefined;
    updateCurrentEditor(editor: TextEditor | null): void;
    showSignatureHelp(provider: SignatureHelpProvider, editor: TextEditor, position: Point): Promise<void>;
    mountSignatureHelp(editor: TextEditor, position: Point, view: ViewContainer): CompositeDisposable;
    unmountDataTip(): void;
}
