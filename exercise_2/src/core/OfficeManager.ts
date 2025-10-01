import { Room, RoomStatus } from '../models/Room';
import { AcControlObserver, LightControlObserver, OccupancySensorObserver } from '../observers/RoomStatusObserver';
import { Logger } from 'winston';
import { createLogger } from '../utils/Logger';

export class OfficeManager {
    private static instance: OfficeManager;
    private readonly logger: Logger;
    private rooms: Map<number, Room>;
    private acObserver: AcControlObserver;
    private lightObserver: LightControlObserver;
    private sensorObserver: OccupancySensorObserver;

    private constructor() {
        this.logger = createLogger('OfficeManager');
        this.rooms = new Map();
        this.acObserver = new AcControlObserver();
        this.lightObserver = new LightControlObserver();
        this.sensorObserver = new OccupancySensorObserver();

        this.logger.info('OfficeManager instance created');
    }

    public static getInstance(): OfficeManager {
        if (!OfficeManager.instance) {
            OfficeManager.instance = new OfficeManager();
        }
        return OfficeManager.instance;
    }

    public configureRooms(count: number): void {
        if (count <= 0) {
            throw new Error('Room count must be positive');
        }

        // Clean up existing rooms
        this.rooms.forEach(room => room.dispose());
        this.rooms.clear();

        // Create new rooms
        for (let i = 1; i <= count; i++) {
            const room = new Room(i);
            this.setupRoomObservers(room);
            this.rooms.set(i, room);
        }

        this.logger.info(`Office configured with ${count} rooms`);
    }

    private setupRoomObservers(room: Room): void {
        room.on('statusChanged', (status: RoomStatus) => {
            this.acObserver.update(status);
            this.lightObserver.update(status);
            this.sensorObserver.update(status);
        });

        room.on('bookingReleased', (status: RoomStatus) => {
            this.logger.warn(`Room ${status.roomId} booking automatically released due to no occupancy`);
        });
    }

    public getRoom(roomId: number): Room {
        const room = this.rooms.get(roomId);
        if (!room) {
            throw new Error(`Room ${roomId} does not exist.`);
        }
        return room;
    }

    public roomExists(roomId: number): boolean {
        return this.rooms.has(roomId);
    }

    public getRoomIds(): number[] {
        return Array.from(this.rooms.keys()).sort((a, b) => a - b);
    }

    public getRoomCount(): number {
        return this.rooms.size;
    }

    public getAllRoomStatuses(): RoomStatus[] {
        return Array.from(this.rooms.values()).map(room => room.getStatus());
    }

    public dispose(): void {
        this.rooms.forEach(room => room.dispose());
        this.rooms.clear();
        this.logger.info('OfficeManager disposed');
    }
}
