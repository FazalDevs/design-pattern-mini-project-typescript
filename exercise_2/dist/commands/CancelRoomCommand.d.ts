import { ICommand, CommandResult } from './ICommand';
import { OfficeManager } from '../core/OfficeManager';
export declare class CancelRoomCommand implements ICommand {
    private readonly roomId;
    private readonly officeManager;
    private readonly logger;
    constructor(roomId: number, officeManager: OfficeManager);
    canExecute(): boolean;
    getDescription(): string;
    execute(): CommandResult;
}
//# sourceMappingURL=CancelRoomCommand.d.ts.map