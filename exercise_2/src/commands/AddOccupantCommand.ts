import { ICommand, CommandResult } from './ICommand';
import { OfficeManager } from '../core/OfficeManager';
import { Logger } from 'winston';
import { createLogger } from '../utils/Logger';

export class AddOccupantCommand implements ICommand {
    private readonly logger: Logger;

    constructor(
        private readonly roomId: number,
        private readonly occupantCount: number,
        private readonly officeManager: OfficeManager
    ) {
        this.logger = createLogger('AddOccupantCommand');
    }

    canExecute(): boolean {
        return this.officeManager.roomExists(this.roomId) && this.occupantCount >= 0;
    }

    getDescription(): string {
        return `Set Room ${this.roomId} occupancy to ${this.occupantCount}`;
    }

    execute(): CommandResult {
        try {
            if (!this.officeManager.roomExists(this.roomId)) {
                return {
                    success: false,
                    message: `Room ${this.roomId} does not exist.`
                };
            }

            if (this.occupantCount < 0) {
                return {
                    success: false,
                    message: 'Occupant count cannot be negative.'
                };
            }

            const room = this.officeManager.getRoom(this.roomId);
            room.setOccupancy(this.occupantCount);

            let message: string;
            if (this.occupantCount === 0) {
                message = `Room ${this.roomId} is now unoccupied. AC and lights turned off.`;
            } else if (this.occupantCount < 2) {
                message = `Room ${this.roomId} occupancy insufficient to mark as occupied.`;
            } else {
                message = `Room ${this.roomId} is now occupied by ${this.occupantCount} persons. AC and lights turned on.`;
            }

            this.logger.info(`Successfully set Room ${this.roomId} occupancy to ${this.occupantCount}`);

            return {
                success: true,
                message
            };
        } catch (error) {
            this.logger.error(`Failed to set Room ${this.roomId} occupancy`, { error });
            return {
                success: false,
                message: (error as Error).message,
                error: error as Error
            };
        }
    }
}
