import { EventEmitter } from 'events';
import { Logger } from 'winston';
import { createLogger } from '../utils/Logger';

export interface RoomStatus {
    readonly roomId: number;
    readonly isBooked: boolean;
    readonly isOccupied: boolean;
    readonly acOn: boolean;
    readonly lightsOn: boolean;
    readonly currentOccupancy: number;
    readonly maxCapacity: number;
}

export class Room extends EventEmitter {
    private readonly logger: Logger;
    private _maxCapacity: number;
    private _currentOccupancy: number;
    private _bookingTime: Date | null;
    private _bookingDuration: number;
    private _occupancyTimer: NodeJS.Timeout | null;

    constructor(
        private readonly _id: number,
        maxCapacity: number = 10
    ) {
        super();
        this.logger = createLogger(`Room-${_id}`);
        this._maxCapacity = maxCapacity;
        this._currentOccupancy = 0;
        this._bookingTime = null;
        this._bookingDuration = 0;
        this._occupancyTimer = null;

        this.logger.info(`Room ${_id} initialized with capacity ${maxCapacity}`);
    }

    get id(): number {
        return this._id;
    }

    get maxCapacity(): number {
        return this._maxCapacity;
    }

    set maxCapacity(capacity: number) {
        if (capacity <= 0) {
            throw new Error('Invalid capacity. Please enter a valid positive number.');
        }
        this._maxCapacity = capacity;
        this.logger.info(`Room ${this._id} capacity updated to ${capacity}`);
        this.notifyStatusChange();
    }

    get currentOccupancy(): number {
        return this._currentOccupancy;
    }

    get isBooked(): boolean {
        return this._bookingTime !== null &&
            new Date() < new Date(this._bookingTime.getTime() + this._bookingDuration * 60000);
    }

    get isOccupied(): boolean {
        return this._currentOccupancy >= 2;
    }

    get bookingTime(): Date | null {
        return this._bookingTime;
    }

    get bookingDuration(): number {
        return this._bookingDuration;
    }

    public bookRoom(startTime: Date, durationMinutes: number): void {
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

    public cancelBooking(): void {
        if (!this.isBooked) {
            throw new Error(`Room ${this._id} is not booked. Cannot cancel booking.`);
        }

        this._bookingTime = null;
        this._bookingDuration = 0;
        this.stopOccupancyTimer();

        this.logger.info(`Room ${this._id} booking cancelled`);
        this.notifyStatusChange();
    }

    public setOccupancy(occupantCount: number): void {
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
        } else if (this.isBooked) {
            this.startOccupancyTimer();
        }
    }

    public getStatus(): RoomStatus {
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

    private startOccupancyTimer(): void {
        this.stopOccupancyTimer();
        this._occupancyTimer = setTimeout(() => {
            this.checkOccupancyTimeout();
        }, 5 * 60 * 1000); // 5 minutes
    }

    private stopOccupancyTimer(): void {
        if (this._occupancyTimer) {
            clearTimeout(this._occupancyTimer);
            this._occupancyTimer = null;
        }
    }

    private checkOccupancyTimeout(): void {
        if (this.isBooked && !this.isOccupied) {
            this.logger.warn(`Room ${this._id} booking released due to no occupancy within 5 minutes`);
            this._bookingTime = null;
            this._bookingDuration = 0;
            this.notifyStatusChange();
            this.emit('bookingReleased', this.getStatus());
        }
    }

    private notifyStatusChange(): void {
        const status = this.getStatus();
        this.emit('statusChanged', status);
    }

    public dispose(): void {
        this.stopOccupancyTimer();
        this.removeAllListeners();
        this.logger.info(`Room ${this._id} disposed`);
    }
}
