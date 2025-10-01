import { ICommand, CommandResult } from './ICommand';
import { OfficeManager } from '../core/OfficeManager';
export declare class AddOccupantCommand implements ICommand {
    private readonly roomId;
    private readonly occupantCount;
    private readonly officeManager;
    private readonly logger;
    constructor(roomId: number, occupantCount: number, officeManager: OfficeManager);
    canExecute(): boolean;
    getDescription(): string;
    execute(): CommandResult;
}
//# sourceMappingURL=AddOccupantCommand.d.ts.map