"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigureRoomCountCommand = void 0;
const Logger_1 = require("../utils/Logger");
class ConfigureRoomCountCommand {
    constructor(roomCount, officeManager) {
        this.roomCount = roomCount;
        this.officeManager = officeManager;
        this.logger = (0, Logger_1.createLogger)('ConfigureRoomCountCommand');
    }
    canExecute() {
        return this.roomCount > 0 && this.roomCount <= 50;
    }
    getDescription() {
        return `Configure office with ${this.roomCount} rooms`;
    }
    execute() {
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
        }
        catch (error) {
            this.logger.error('Failed to configure rooms', { error });
            return {
                success: false,
                message: 'Failed to configure rooms',
                error: error
            };
        }
    }
}
exports.ConfigureRoomCountCommand = ConfigureRoomCountCommand;
//# sourceMappingURL=ConfigureRoomCountCommand.js.map