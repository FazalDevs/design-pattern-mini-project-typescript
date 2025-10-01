import { IObserver } from './IObserver';
import { RoomStatus } from '../models/Room';
export declare class AcControlObserver implements IObserver<RoomStatus> {
    private readonly logger;
    constructor();
    update(status: RoomStatus): void;
}
export declare class LightControlObserver implements IObserver<RoomStatus> {
    private readonly logger;
    constructor();
    update(status: RoomStatus): void;
}
export declare class OccupancySensorObserver implements IObserver<RoomStatus> {
    private readonly logger;
    constructor();
    update(status: RoomStatus): void;
}
//# sourceMappingURL=RoomStatusObserver.d.ts.map