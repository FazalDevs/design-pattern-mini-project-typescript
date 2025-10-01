import { ICommand, CommandResult } from './ICommand';
import { OfficeManager } from '../core/OfficeManager';
import { Logger } from 'winston';
import { createLogger } from '../utils/Logger';

export class SetRoomCapacityCommand implements ICommand {
    private readonly logger: Logger;

    constructor(
        private readonly roomId: number,
        private readonly capacity: number,
        private readonly officeManager: OfficeManager
    ) {
        this.logger = createLogger('SetRoomCapacityCommand');
    }

    canExecute(): boolean {
        return this.capacity > 0 && this.officeManager.roomExists(this.roomId);
    }

    getDescription(): string {
        return `Set Room ${this.roomId} capacity to ${this.capacity}`;
    }

    execute(): CommandResult {
        try {
            if (!this.officeManager.roomExists(this.roomId)) {
                return {
                    success: false,
                    message: `Room ${this.roomId} does not exist.`
                };
            }

            if (this.capacity <= 0) {
                return {
                    success: false,
                    message: 'Invalid capacity. Please enter a valid positive number.'
                };
            }

            const room = this.officeManager.getRoom(this.roomId);
            room.maxCapacity = this.capacity;

            const message = `Room ${this.roomId} maximum capacity set to ${this.capacity}.`;
            this.logger.info(`Successfully set Room ${this.roomId} capacity to ${this.capacity}`);

            return {
                success: true,
                message
            };
        } catch (error) {
            this.logger.error(`Failed to set Room ${this.roomId} capacity`, { error });
            return {
                success: false,
                message: `Failed to set Room ${this.roomId} capacity`,
                error: error as Error
            };
        }
    }
}
