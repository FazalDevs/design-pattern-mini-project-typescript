import { ICommand, CommandResult } from './ICommand';
import { OfficeManager } from '../core/OfficeManager';
export declare class BookRoomCommand implements ICommand {
    private readonly roomId;
    private readonly startTime;
    private readonly durationMinutes;
    private readonly officeManager;
    private readonly logger;
    constructor(roomId: number, startTime: string, durationMinutes: number, officeManager: OfficeManager);
    canExecute(): boolean;
    getDescription(): string;
    private isValidTimeFormat;
    private parseTime;
    execute(): CommandResult;
}
//# sourceMappingURL=BookRoomCommand.d.ts.map