"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OccupancySensorObserver = exports.LightControlObserver = exports.AcControlObserver = void 0;
const Logger_1 = require("../utils/Logger");
class AcControlObserver {
    constructor() {
        this.logger = (0, Logger_1.createLogger)('AC-Control');
    }
    update(status) {
        if (status.acOn) {
            this.logger.info(`AC turned ON for Room ${status.roomId}`);
        }
        else {
            this.logger.info(`AC turned OFF for Room ${status.roomId}`);
        }
    }
}
exports.AcControlObserver = AcControlObserver;
class LightControlObserver {
    constructor() {
        this.logger = (0, Logger_1.createLogger)('Light-Control');
    }
    update(status) {
        if (status.lightsOn) {
            this.logger.info(`Lights turned ON for Room ${status.roomId}`);
        }
        else {
            this.logger.info(`Lights turned OFF for Room ${status.roomId}`);
        }
    }
}
exports.LightControlObserver = LightControlObserver;
class OccupancySensorObserver {
    constructor() {
        this.logger = (0, Logger_1.createLogger)('Occupancy-Sensor');
    }
    update(status) {
        this.logger.info(`Room ${status.roomId} occupancy detected: ${status.currentOccupancy} persons (${status.isOccupied ? 'Occupied' : 'Unoccupied'})`);
    }
}
exports.OccupancySensorObserver = OccupancySensorObserver;
//# sourceMappingURL=RoomStatusObserver.js.map