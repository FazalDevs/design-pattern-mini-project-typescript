import { ICommand, CommandResult } from '../commands/ICommand';
import { Logger } from 'winston';
import { createLogger } from '../utils/Logger';

export class CommandInvoker {
    private readonly logger: Logger;
    private commandHistory: ICommand[];

    constructor() {
        this.logger = createLogger('CommandInvoker');
        this.commandHistory = [];
    }

    public async executeCommand(command: ICommand): Promise<CommandResult> {
        this.logger.info(`Executing command: ${command.getDescription()}`);

        try {
            if (!command.canExecute()) {
                const result: CommandResult = {
                    success: false,
                    message: 'Command cannot be executed'
                };
                this.logger.warn(`Command execution failed: ${command.getDescription()}`, { result });
                return result;
            }

            const result = await Promise.resolve(command.execute());
            this.commandHistory.push(command);

            if (result.success) {
                this.logger.info(`Command executed successfully: ${command.getDescription()}`, { result });
            } else {
                this.logger.error(`Command execution failed: ${command.getDescription()}`, { result });
            }

            return result;
        } catch (error) {
            const result: CommandResult = {
                success: false,
                message: 'Unexpected error during command execution',
                error: error as Error
            };

            this.logger.error(`Command execution error: ${command.getDescription()}`, { error });
            return result;
        }
    }

    public getCommandHistory(): ICommand[] {
        return [...this.commandHistory];
    }

    public clearHistory(): void {
        this.commandHistory = [];
        this.logger.info('Command history cleared');
    }
}
