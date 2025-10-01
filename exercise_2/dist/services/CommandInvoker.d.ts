import { ICommand, CommandResult } from '../commands/ICommand';
export declare class CommandInvoker {
    private readonly logger;
    private commandHistory;
    constructor();
    executeCommand(command: ICommand): Promise<CommandResult>;
    getCommandHistory(): ICommand[];
    clearHistory(): void;
}
//# sourceMappingURL=CommandInvoker.d.ts.map