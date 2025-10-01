import { ICommand, CommandResult } from './ICommand';
import { OfficeManager } from '../core/OfficeManager';
export declare class ConfigureRoomCountCommand implements ICommand {
    private readonly roomCount;
    private readonly officeManager;
    private readonly logger;
    constructor(roomCount: number, officeManager: OfficeManager);
    canExecute(): boolean;
    getDescription(): string;
    execute(): CommandResult;
}
//# sourceMappingURL=ConfigureRoomCountCommand.d.ts.map