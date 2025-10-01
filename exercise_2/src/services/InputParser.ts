import { OfficeManager } from '../core/OfficeManager';
import { ConfigureRoomCountCommand } from '../commands/ConfigureRoomCountCommand';
import { SetRoomCapacityCommand } from '../commands/SetRoomCapacityCommand';
import { BookRoomCommand } from '../commands/BookRoomCommand';
import { CancelRoomCommand } from '../commands/CancelRoomCommand';
import { AddOccupantCommand } from '../commands/AddOccupantCommand';
import { ICommand } from '../commands/ICommand';
import { Logger } from 'winston';
import { createLogger } from '../utils/Logger';

export class InputParser {
    private readonly logger: Logger;

    constructor(
        private readonly officeManager: OfficeManager
    ) {
        this.logger = createLogger('InputParser');
    }

    public parseInput(input: string): ICommand | null {
        const trimmedInput = input.trim();
        if (!trimmedInput) return null;

        const parts = trimmedInput.split(/\s+/);
        const commandType = parts[0].toLowerCase();

        try {
            switch (commandType) {
                case 'config':
                    return this.parseConfigCommand(parts);
                case 'block':
                    return this.parseBlockCommand(parts);
                case 'cancel':
                    return this.parseCancelCommand(parts);
                case 'add':
                    return this.parseAddCommand(parts);
                default:
                    this.logger.warn(`Unknown command: ${commandType}`);
                    return null;
            }
        } catch (error) {
            this.logger.error('Error parsing command', { input, error });
            return null;
        }
    }

    private parseConfigCommand(parts: string[]): ICommand | null {
        if (parts.length >= 4 && parts[1] === 'room') {
            if (parts[2] === 'count') {
                const count = parseInt(parts[3]);
                if (isNaN(count)) {
                    throw new Error('Invalid room count');
                }
                return new ConfigureRoomCountCommand(count, this.officeManager);
            } else if (parts[2] === 'max' && parts[3] === 'capacity' && parts.length >= 6) {
                const roomId = parseInt(parts[4]);
                const capacity = parseInt(parts[5]);
                if (isNaN(roomId) || isNaN(capacity)) {
                    throw new Error('Invalid room ID or capacity');
                }
                return new SetRoomCapacityCommand(roomId, capacity, this.officeManager);
            }
        }
        return null;
    }

    private parseBlockCommand(parts: string[]): ICommand | null {
        // Format: block room 1 09:00 60
        if (parts.length >= 5 && parts[1] === 'room') {
            const roomId = parseInt(parts[2]);
            const startTime = parts[3];
            const duration = parseInt(parts[4]);

            if (isNaN(roomId) || isNaN(duration)) {
                throw new Error('Invalid room ID or duration');
            }

            return new BookRoomCommand(roomId, startTime, duration, this.officeManager);
        }
        return null;
    }

    private parseCancelCommand(parts: string[]): ICommand | null {
        // Format: cancel room 1
        if (parts.length >= 3 && parts[1] === 'room') {
            const roomId = parseInt(parts[2]);
            if (isNaN(roomId)) {
                throw new Error('Invalid room ID');
            }
            return new CancelRoomCommand(roomId, this.officeManager);
        }
        return null;
    }

    private parseAddCommand(parts: string[]): ICommand | null {
        // Format: add occupant 1 2
        if (parts.length >= 4 && parts[1] === 'occupant') {
            const roomId = parseInt(parts[2]);
            const count = parseInt(parts[3]);

            if (isNaN(roomId) || isNaN(count)) {
                throw new Error('Invalid room ID or occupant count');
            }

            return new AddOccupantCommand(roomId, count, this.officeManager);
        }
        return null;
    }

    public getHelpText(): string {
        return `
Available Commands:
1. config room count <number>                    - Configure office with specified number of rooms
2. config room max capacity <roomId> <capacity>  - Set maximum capacity for a room
3. block room <roomId> <HH:MM> <duration>       - Book a room for specified duration (minutes)
4. cancel room <roomId>                          - Cancel room booking
5. add occupant <roomId> <count>                 - Set room occupancy
6. help                                          - Show this help message
7. status                                        - Show current room statuses
8. quit                                          - Exit the application

Examples:
- config room count 3
- config room max capacity 1 10
- block room 1 09:00 60
- cancel room 1
- add occupant 1 2
    `.trim();
    }
}
