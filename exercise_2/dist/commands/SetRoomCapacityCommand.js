"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetRoomCapacityCommand = void 0;
const Logger_1 = require("../utils/Logger");
class SetRoomCapacityCommand {
    constructor(roomId, capacity, officeManager) {
        this.roomId = roomId;
        this.capacity = capacity;
        this.officeManager = officeManager;
        this.logger = (0, Logger_1.createLogger)('SetRoomCapacityCommand');
    }
    canExecute() {
        return this.capacity > 0 && this.officeManager.roomExists(this.roomId);
    }
    getDescription() {
        return `Set Room ${this.roomId} capacity to ${this.capacity}`;
    }
    execute() {
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
        }
        catch (error) {
            this.logger.error(`Failed to set Room ${this.roomId} capacity`, { error });
            return {
                success: false,
                message: `Failed to set Room ${this.roomId} capacity`,
                error: error
            };
        }
    }
}
exports.SetRoomCapacityCommand = SetRoomCapacityCommand;
//# sourceMappingURL=SetRoomCapacityCommand.js.map