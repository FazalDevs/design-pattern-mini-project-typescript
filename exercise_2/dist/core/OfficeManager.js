"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfficeManager = void 0;
const Room_1 = require("../models/Room");
const RoomStatusObserver_1 = require("../observers/RoomStatusObserver");
const Logger_1 = require("../utils/Logger");
class OfficeManager {
    constructor() {
        this.logger = (0, Logger_1.createLogger)('OfficeManager');
        this.rooms = new Map();
        this.acObserver = new RoomStatusObserver_1.AcControlObserver();
        this.lightObserver = new RoomStatusObserver_1.LightControlObserver();
        this.sensorObserver = new RoomStatusObserver_1.OccupancySensorObserver();
        this.logger.info('OfficeManager instance created');
    }
    static getInstance() {
        if (!OfficeManager.instance) {
            OfficeManager.instance = new OfficeManager();
        }
        return OfficeManager.instance;
    }
    configureRooms(count) {
        if (count <= 0) {
            throw new Error('Room count must be positive');
        }
        this.rooms.forEach(room => room.dispose());
        this.rooms.clear();
        for (let i = 1; i <= count; i++) {
            const room = new Room_1.Room(i);
            this.setupRoomObservers(room);
            this.rooms.set(i, room);
        }
        this.logger.info(`Office configured with ${count} rooms`);
    }
    setupRoomObservers(room) {
        room.on('statusChanged', (status) => {
            this.acObserver.update(status);
            this.lightObserver.update(status);
            this.sensorObserver.update(status);
        });
        room.on('bookingReleased', (status) => {
            this.logger.warn(`Room ${status.roomId} booking automatically released due to no occupancy`);
        });
    }
    getRoom(roomId) {
        const room = this.rooms.get(roomId);
        if (!room) {
            throw new Error(`Room ${roomId} does not exist.`);
        }
        return room;
    }
    roomExists(roomId) {
        return this.rooms.has(roomId);
    }
    getRoomIds() {
        return Array.from(this.rooms.keys()).sort((a, b) => a - b);
    }
    getRoomCount() {
        return this.rooms.size;
    }
    getAllRoomStatuses() {
        return Array.from(this.rooms.values()).map(room => room.getStatus());
    }
    dispose() {
        this.rooms.forEach(room => room.dispose());
        this.rooms.clear();
        this.logger.info('OfficeManager disposed');
    }
}
exports.OfficeManager = OfficeManager;
//# sourceMappingURL=OfficeManager.js.map