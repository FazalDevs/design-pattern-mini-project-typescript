import { EventEmitter } from 'events';
export interface RoomStatus {
    readonly roomId: number;
    readonly isBooked: boolean;
    readonly isOccupied: boolean;
    readonly acOn: boolean;
    readonly lightsOn: boolean;
    readonly currentOccupancy: number;
    readonly maxCapacity: number;
}
export declare class Room extends EventEmitter {
    private readonly _id;
    private readonly logger;
    private _maxCapacity;
    private _currentOccupancy;
    private _bookingTime;
    private _bookingDuration;
    private _occupancyTimer;
    constructor(_id: number, maxCapacity?: number);
    get id(): number;
    get maxCapacity(): number;
    set maxCapacity(capacity: number);
    get currentOccupancy(): number;
    get isBooked(): boolean;
    get isOccupied(): boolean;
    get bookingTime(): Date | null;
    get bookingDuration(): number;
    bookRoom(startTime: Date, durationMinutes: number): void;
    cancelBooking(): void;
    setOccupancy(occupantCount: number): void;
    getStatus(): RoomStatus;
    private startOccupancyTimer;
    private stopOccupancyTimer;
    private checkOccupancyTimeout;
    private notifyStatusChange;
    dispose(): void;
}
//# sourceMappingURL=Room.d.ts.map