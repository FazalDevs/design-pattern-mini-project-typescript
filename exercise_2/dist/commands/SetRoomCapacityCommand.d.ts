import { ICommand, CommandResult } from './ICommand';
import { OfficeManager } from '../core/OfficeManager';
export declare class SetRoomCapacityCommand implements ICommand {
    private readonly roomId;
    private readonly capacity;
    private readonly officeManager;
    private readonly logger;
    constructor(roomId: number, capacity: number, officeManager: OfficeManager);
    canExecute(): boolean;
    getDescription(): string;
    execute(): CommandResult;
}
//# sourceMappingURL=SetRoomCapacityCommand.d.ts.map