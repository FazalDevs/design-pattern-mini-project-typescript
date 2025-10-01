"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandInvoker = void 0;
const Logger_1 = require("../utils/Logger");
class CommandInvoker {
    constructor() {
        this.logger = (0, Logger_1.createLogger)('CommandInvoker');
        this.commandHistory = [];
    }
    async executeCommand(command) {
        this.logger.info(`Executing command: ${command.getDescription()}`);
        try {
            if (!command.canExecute()) {
                const result = {
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
            }
            else {
                this.logger.error(`Command execution failed: ${command.getDescription()}`, { result });
            }
            return result;
        }
        catch (error) {
            const result = {
                success: false,
                message: 'Unexpected error during command execution',
                error: error
            };
            this.logger.error(`Command execution error: ${command.getDescription()}`, { error });
            return result;
        }
    }
    getCommandHistory() {
        return [...this.commandHistory];
    }
    clearHistory() {
        this.commandHistory = [];
        this.logger.info('Command history cleared');
    }
}
exports.CommandInvoker = CommandInvoker;
//# sourceMappingURL=CommandInvoker.js.map