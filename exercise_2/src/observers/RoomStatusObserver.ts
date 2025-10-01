import { IObserver } from './IObserver';
import { RoomStatus } from '../models/Room';
import { Logger } from 'winston';
import { createLogger } from '../utils/Logger';

export class AcControlObserver implements IObserver<RoomStatus> {
    private readonly logger: Logger;

    constructor() {
        this.logger = createLogger('AC-Control');
    }

    update(status: RoomStatus): void {
        if (status.acOn) {
            this.logger.info(`AC turned ON for Room ${status.roomId}`);
        } else {
            this.logger.info(`AC turned OFF for Room ${status.roomId}`);
        }
    }
}

export class LightControlObserver implements IObserver<RoomStatus> {
    private readonly logger: Logger;

    constructor() {
        this.logger = createLogger('Light-Control');
    }

    update(status: RoomStatus): void {
        if (status.lightsOn) {
            this.logger.info(`Lights turned ON for Room ${status.roomId}`);
        } else {
            this.logger.info(`Lights turned OFF for Room ${status.roomId}`);
        }
    }
}

export class OccupancySensorObserver implements IObserver<RoomStatus> {
    private readonly logger: Logger;

    constructor() {
        this.logger = createLogger('Occupancy-Sensor');
    }

    update(status: RoomStatus): void {
        this.logger.info(`Room ${status.roomId} occupancy detected: ${status.currentOccupancy} persons (${status.isOccupied ? 'Occupied' : 'Unoccupied'})`);
    }
}
