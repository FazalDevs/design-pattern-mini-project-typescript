import { ICommand, CommandResult } from './ICommand';
import { OfficeManager } from '../core/OfficeManager';
import { Logger } from 'winston';
import { createLogger } from '../utils/Logger';

export class CancelRoomCommand implements ICommand {
    private readonly logger: Logger;

    constructor(
        private readonly roomId: number,
        private readonly officeManager: OfficeManager
    ) {
        this.logger = createLogger('CancelRoomCommand');
    }

    canExecute(): boolean {
        return this.officeManager.roomExists(this.roomId);
    }

    getDescription(): string {
        return `Cancel booking for Room ${this.roomId}`;
    }

    execute(): CommandResult {
        try {
            if (!this.officeManager.roomExists(this.roomId)) {
                return {
                    success: false,
                    message: `Room ${this.roomId} does not exist.`
                };
            }

            const room = this.officeManager.getRoom(this.roomId);
            room.cancelBooking();

            const message = `Booking for Room ${this.roomId} cancelled successfully.`;
            this.logger.info(`Successfully cancelled Room ${this.roomId} booking`);

            return {
                success: true,
                message
            };
        } catch (error) {
            this.logger.error(`Failed to cancel Room ${this.roomId} booking`, { error });
            return {
                success: false,
                message: (error as Error).message,
                error: error as Error
            };
        }
    }
}
