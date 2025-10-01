"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoomCommand = void 0;
const Logger_1 = require("../utils/Logger");
class BookRoomCommand {
    constructor(roomId, startTime, durationMinutes, officeManager) {
        this.roomId = roomId;
        this.startTime = startTime;
        this.durationMinutes = durationMinutes;
        this.officeManager = officeManager;
        this.logger = (0, Logger_1.createLogger)('BookRoomCommand');
    }
    canExecute() {
        return this.officeManager.roomExists(this.roomId) &&
            this.durationMinutes > 0 &&
            this.isValidTimeFormat(this.startTime);
    }
    getDescription() {
        return `Book Room ${this.roomId} at ${this.startTime} for ${this.durationMinutes} minutes`;
    }
    isValidTimeFormat(time) {
        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return timeRegex.test(time);
    }
    parseTime(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    }
    execute() {
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
        }
        catch (error) {
            this.logger.error(`Failed to book Room ${this.roomId}`, { error });
            return {
                success: false,
                message: error.message,
                error: error
            };
        }
    }
}
exports.BookRoomCommand = BookRoomCommand;
//# sourceMappingURL=BookRoomCommand.js.map