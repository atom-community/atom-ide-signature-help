import { SignatureHelpRegistry } from "atom-ide-base";
export declare function activate(): void;
export declare function deactivate(): void;
export declare function provideSignatureHelp(): SignatureHelpRegistry;
export declare const config: {
    showSignatureHelpOnTyping: {
        title: string;
        description: string;
        type: string;
        default: boolean;
    };
};
