"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddOccupantCommand = void 0;
const Logger_1 = require("../utils/Logger");
class AddOccupantCommand {
    constructor(roomId, occupantCount, officeManager) {
        this.roomId = roomId;
        this.occupantCount = occupantCount;
        this.officeManager = officeManager;
        this.logger = (0, Logger_1.createLogger)('AddOccupantCommand');
    }
    canExecute() {
        return this.officeManager.roomExists(this.roomId) && this.occupantCount >= 0;
    }
    getDescription() {
        return `Set Room ${this.roomId} occupancy to ${this.occupantCount}`;
    }
    execute() {
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
            let message;
            if (this.occupantCount === 0) {
                message = `Room ${this.roomId} is now unoccupied. AC and lights turned off.`;
            }
            else if (this.occupantCount < 2) {
                message = `Room ${this.roomId} occupancy insufficient to mark as occupied.`;
            }
            else {
                message = `Room ${this.roomId} is now occupied by ${this.occupantCount} persons. AC and lights turned on.`;
            }
            this.logger.info(`Successfully set Room ${this.roomId} occupancy to ${this.occupantCount}`);
            return {
                success: true,
                message
            };
        }
        catch (error) {
            this.logger.error(`Failed to set Room ${this.roomId} occupancy`, { error });
            return {
                success: false,
                message: error.message,
                error: error
            };
        }
    }
}
exports.AddOccupantCommand = AddOccupantCommand;
//# sourceMappingURL=AddOccupantCommand.js.map