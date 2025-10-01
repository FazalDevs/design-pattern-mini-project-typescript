import { ICommand, CommandResult } from './ICommand';
import { OfficeManager } from '../core/OfficeManager';
import { Logger } from 'winston';
import { createLogger } from '../utils/Logger';

export class BookRoomCommand implements ICommand {
    private readonly logger: Logger;

    constructor(
        private readonly roomId: number,
        private readonly startTime: string,
        private readonly durationMinutes: number,
        private readonly officeManager: OfficeManager
    ) {
        this.logger = createLogger('BookRoomCommand');
    }

    canExecute(): boolean {
        return this.officeManager.roomExists(this.roomId) &&
            this.durationMinutes > 0 &&
            this.isValidTimeFormat(this.startTime);
    }

    getDescription(): string {
        return `Book Room ${this.roomId} at ${this.startTime} for ${this.durationMinutes} minutes`;
    }

    private isValidTimeFormat(time: string): boolean {
        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return timeRegex.test(time);
    }

    private parseTime(timeString: string): Date {
        const [hours, minutes] = timeString.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    }

    execute(): CommandResult {
        try {
            if (!this.officeManager.roomExists(this.roomId)) {
                return {
                    success: false,
                    message: `Room ${this.roomId} does not exist.`
                };
            }

            if (!this.isValidTimeFormat(this.startTime)) {
                return {
                    success: false,
                    message: 'Invalid time format. Please use HH:MM format.'
                };
            }

            if (this.durationMinutes <= 0) {
                return {
                    success: false,
                    message: 'Invalid duration. Must be positive.'
                };
            }

            const room = this.officeManager.getRoom(this.roomId);
            const startTime = this.parseTime(this.startTime);

            room.bookRoom(startTime, this.durationMinutes);

            const message = `Room ${this.roomId} booked from ${this.startTime} for ${this.durationMinutes} minutes.`;
            this.logger.info(`Successfully booked Room ${this.roomId}`);

            return {
                success: true,
                message
            };
        } catch (error) {
            this.logger.error(`Failed to book Room ${this.roomId}`, { error });
            return {
                success: false,
                message: (error as Error).message,
                error: error as Error
            };
        }
    }
}
