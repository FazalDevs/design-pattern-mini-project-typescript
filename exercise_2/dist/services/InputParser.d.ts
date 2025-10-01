import { OfficeManager } from '../core/OfficeManager';
import { ICommand } from '../commands/ICommand';
export declare class InputParser {
    private readonly officeManager;
    private readonly logger;
    constructor(officeManager: OfficeManager);
    parseInput(input: string): ICommand | null;
    private parseConfigCommand;
    private parseBlockCommand;
    private parseCancelCommand;
    private parseAddCommand;
    getHelpText(): string;
}
//# sourceMappingURL=InputParser.d.ts.map