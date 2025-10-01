"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputParser = void 0;
const ConfigureRoomCountCommand_1 = require("../commands/ConfigureRoomCountCommand");
const SetRoomCapacityCommand_1 = require("../commands/SetRoomCapacityCommand");
const BookRoomCommand_1 = require("../commands/BookRoomCommand");
const CancelRoomCommand_1 = require("../commands/CancelRoomCommand");
const AddOccupantCommand_1 = require("../commands/AddOccupantCommand");
const Logger_1 = require("../utils/Logger");
class InputParser {
    constructor(officeManager) {
        this.officeManager = officeManager;
        this.logger = (0, Logger_1.createLogger)('InputParser');
    }
    parseInput(input) {
        const trimmedInput = input.trim();
        if (!trimmedInput)
            return null;
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
        }
        catch (error) {
            this.logger.error('Error parsing command', { input, error });
            return null;
        }
    }
    parseConfigCommand(parts) {
        if (parts.length >= 4 && parts[1] === 'room') {
            if (parts[2] === 'count') {
                const count = parseInt(parts[3]);
                if (isNaN(count)) {
                    throw new Error('Invalid room count');
                }
                return new ConfigureRoomCountCommand_1.ConfigureRoomCountCommand(count, this.officeManager);
            }
            else if (parts[2] === 'max' && parts[3] === 'capacity' && parts.length >= 6) {
                const roomId = parseInt(parts[4]);
                const capacity = parseInt(parts[5]);
                if (isNaN(roomId) || isNaN(capacity)) {
                    throw new Error('Invalid room ID or capacity');
                }
                return new SetRoomCapacityCommand_1.SetRoomCapacityCommand(roomId, capacity, this.officeManager);
            }
        }
        return null;
    }
    parseBlockCommand(parts) {
        if (parts.length >= 5 && parts[1] === 'room') {
            const roomId = parseInt(parts[2]);
            const startTime = parts[3];
            const duration = parseInt(parts[4]);
            if (isNaN(roomId) || isNaN(duration)) {
                throw new Error('Invalid room ID or duration');
            }
            return new BookRoomCommand_1.BookRoomCommand(roomId, startTime, duration, this.officeManager);
        }
        return null;
    }
    parseCancelCommand(parts) {
        if (parts.length >= 3 && parts[1] === 'room') {
            const roomId = parseInt(parts[2]);
            if (isNaN(roomId)) {
                throw new Error('Invalid room ID');
            }
            return new CancelRoomCommand_1.CancelRoomCommand(roomId, this.officeManager);
        }
        return null;
    }
    parseAddCommand(parts) {
        if (parts.length >= 4 && parts[1] === 'occupant') {
            const roomId = parseInt(parts[2]);
            const count = parseInt(parts[3]);
            if (isNaN(roomId) || isNaN(count)) {
                throw new Error('Invalid room ID or occupant count');
            }
            return new AddOccupantCommand_1.AddOccupantCommand(roomId, count, this.officeManager);
        }
        return null;
    }
    getHelpText() {
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
exports.InputParser = InputParser;
//# sourceMappingURL=InputParser.js.map