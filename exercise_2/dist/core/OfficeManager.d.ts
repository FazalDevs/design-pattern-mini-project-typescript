import { Room, RoomStatus } from '../models/Room';
export declare class OfficeManager {
    private static instance;
    private readonly logger;
    private rooms;
    private acObserver;
    private lightObserver;
    private sensorObserver;
    private constructor();
    static getInstance(): OfficeManager;
    configureRooms(count: number): void;
    private setupRoomObservers;
    getRoom(roomId: number): Room;
    roomExists(roomId: number): boolean;
    getRoomIds(): number[];
    getRoomCount(): number;
    getAllRoomStatuses(): RoomStatus[];
    dispose(): void;
}
//# sourceMappingURL=OfficeManager.d.ts.map