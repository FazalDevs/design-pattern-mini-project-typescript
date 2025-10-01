"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelRoomCommand = void 0;
const Logger_1 = require("../utils/Logger");
class CancelRoomCommand {
    constructor(roomId, officeManager) {
        this.roomId = roomId;
        this.officeManager = officeManager;
        this.logger = (0, Logger_1.createLogger)('CancelRoomCommand');
    }
    canExecute() {
        return this.officeManager.roomExists(this.roomId);
    }
    getDescription() {
        return `Cancel booking for Room ${this.roomId}`;
    }
    execute() {
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
        }
        catch (error) {
            this.logger.error(`Failed to cancel Room ${this.roomId} booking`, { error });
            return {
                success: false,
                message: error.message,
                error: error
            };
        }
    }
}
exports.CancelRoomCommand = CancelRoomCommand;
//# sourceMappingURL=CancelRoomCommand.js.map