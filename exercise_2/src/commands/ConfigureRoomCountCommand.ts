import { ICommand, CommandResult } from './ICommand';
import { OfficeManager } from '../core/OfficeManager';
import { Logger } from 'winston';
import { createLogger } from '../utils/Logger';

export class ConfigureRoomCountCommand implements ICommand {
    private readonly logger: Logger;

    constructor(
        private readonly roomCount: number,
        private readonly officeManager: OfficeManager
    ) {
        this.logger = createLogger('ConfigureRoomCountCommand');
    }

    canExecute(): boolean {
        return this.roomCount > 0 && this.roomCount <= 50;
    }

    getDescription(): string {
        return `Configure office with ${this.roomCount} rooms`;
    }

    execute(): CommandResult {
        try {
            if (!this.canExecute()) {
                return {
                    success: false,
                    message: 'Invalid room count. Must be between 1 and 50.'
                };
            }

            this.officeManager.configureRooms(this.roomCount);
            const roomIds = this.officeManager.getRoomIds();
            const roomNames = roomIds.map(id => `Room ${id}`).join(', ');
            const message = `Office configured with ${this.roomCount} meeting rooms: ${roomNames}.`;

            this.logger.info(`Successfully configured ${this.roomCount} rooms`);
            return {
                success: true,
                message
            };
        } catch (error) {
            this.logger.error('Failed to configure rooms', { error });
            return {
                success: false,
                message: 'Failed to configure rooms',
                error: error as Error
            };
        }
    }
}
