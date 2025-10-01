"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const events_1 = require("events");
const Logger_1 = require("../utils/Logger");
class Room extends events_1.EventEmitter {
    constructor(_id, maxCapacity = 10) {
        super();
        this._id = _id;
        this.logger = (0, Logger_1.createLogger)(`Room-${_id}`);
        this._maxCapacity = maxCapacity;
        this._currentOccupancy = 0;
        this._bookingTime = null;
        this._bookingDuration = 0;
        this._occupancyTimer = null;
        this.logger.info(`Room ${_id} initialized with capacity ${maxCapacity}`);
    }
    get id() {
        return this._id;
    }
    get maxCapacity() {
        return this._maxCapacity;
    }
    set maxCapacity(capacity) {
        if (capacity <= 0) {
            throw new Error('Invalid capacity. Please enter a valid positive number.');
        }
        this._maxCapacity = capacity;
        this.logger.info(`Room ${this._id} capacity updated to ${capacity}`);
        this.notifyStatusChange();
    }
    get currentOccupancy() {
        return this._currentOccupancy;
    }
    get isBooked() {
        return this._bookingTime !== null &&
            new Date() < new Date(this._bookingTime.getTime() + this._bookingDuration * 60000);
    }
    get isOccupied() {
        return this._currentOccupancy >= 2;
    }
    get bookingTime() {
        return this._bookingTime;
    }
    get bookingDuration() {
        return this._bookingDuration;
    }
    bookRoom(startTime, durationMinutes) {
        if (this.isBooked) {
            throw new Error(`Room ${this._id} is already booked during this time. Cannot book.`);
        }
        if (durationMinutes <= 0) {
            throw new Error('Invalid booking duration. Must be positive.');
        }
        this._bookingTime = startTime;
        this._bookingDuration = durationMinutes;
        this.logger.info(`Room ${this._id} booked from ${startTime.toISOString()} for ${durationMinutes} minutes`);
        this.notifyStatusChange();
        this.startOccupancyTimer();
    }
    cancelBooking() {
        if (!this.isBooked) {
            throw new Error(`Room ${this._id} is not booked. Cannot cancel booking.`);
        }
        this._bookingTime = null;
        this._bookingDuration = 0;
        this.stopOccupancyTimer();
        this.logger.info(`Room ${this._id} booking cancelled`);
        this.notifyStatusChange();
    }
    setOccupancy(occupantCount) {
        if (occupantCount < 0 || occupantCount > this._maxCapacity) {
            throw new Error(`Room ${this._id} occupancy must be between 0 and ${this._maxCapacity}.`);
        }
        const wasOccupied = this.isOccupied;
        this._currentOccupancy = occupantCount;
        if (occupantCount < 2) {
            this.logger.info(`Room ${this._id} occupancy insufficient to mark as occupied.`);
        }
        if (wasOccupied !== this.isOccupied) {
            this.logger.info(`Room ${this._id} occupancy changed to ${occupantCount}. ${this.isOccupied ? 'AC and lights turned on' : 'AC and lights turned off'}`);
        }
        this.notifyStatusChange();
        if (this.isOccupied) {
            this.stopOccupancyTimer();
        }
        else if (this.isBooked) {
            this.startOccupancyTimer();
        }
    }
    getStatus() {
        return {
            roomId: this._id,
            isBooked: this.isBooked,
            isOccupied: this.isOccupied,
            acOn: this.isOccupied,
            lightsOn: this.isOccupied,
            currentOccupancy: this._currentOccupancy,
            maxCapacity: this._maxCapacity
        };
    }
    startOccupancyTimer() {
        this.stopOccupancyTimer();
        this._occupancyTimer = setTimeout(() => {
            this.checkOccupancyTimeout();
        }, 5 * 60 * 1000);
    }
    stopOccupancyTimer() {
        if (this._occupancyTimer) {
            clearTimeout(this._occupancyTimer);
            this._occupancyTimer = null;
        }
    }
    checkOccupancyTimeout() {
        if (this.isBooked && !this.isOccupied) {
            this.logger.warn(`Room ${this._id} booking released due to no occupancy within 5 minutes`);
            this._bookingTime = null;
            this._bookingDuration = 0;
            this.notifyStatusChange();
            this.emit('bookingReleased', this.getStatus());
        }
    }
    notifyStatusChange() {
        const status = this.getStatus();
        this.emit('statusChanged', status);
    }
    dispose() {
        this.stopOccupancyTimer();
        this.removeAllListeners();
        this.logger.info(`Room ${this._id} disposed`);
    }
}
exports.Room = Room;
//# sourceMappingURL=Room.js.map