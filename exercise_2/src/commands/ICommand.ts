export interface CommandResult {
    success: boolean;
    message: string;
    error?: Error;
}

export interface ICommand {
    execute(): Promise<CommandResult> | CommandResult;
    canExecute(): boolean;
    getDescription(): string;
}
