import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';
import { OfficeManager } from './core/OfficeManager';
import { CommandInvoker } from './services/CommandInvoker';
import { InputParser } from './services/InputParser';
import { createLogger } from './utils/Logger';

class SmartOfficeFacilityApp {
    private readonly logger = createLogger('SmartOfficeFacilityApp');
    private readonly officeManager: OfficeManager;
    private readonly commandInvoker: CommandInvoker;
    private readonly inputParser: InputParser;
    private readonly rl: readline.Interface;
    private isRunning = true;

    constructor() {
        // Ensure logs directory exists
        this.ensureLogsDirectory();

        this.officeManager = OfficeManager.getInstance();
        this.commandInvoker = new CommandInvoker();
        this.inputParser = new InputParser(this.officeManager);

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: 'SmartOffice> '
        });

        this.setupSignalHandlers();
        this.logger.info('Smart Office Facility Application started');
    }

    private ensureLogsDirectory(): void {
        const logsDir = path.join(process.cwd(), 'logs');
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
        }
    }

    private setupSignalHandlers(): void {
        process.on('SIGINT', () => {
            this.shutdown();
        });

        process.on('SIGTERM', () => {
            this.shutdown();
        });

        process.on('uncaughtException', (error) => {
            this.logger.error('Uncaught Exception', { error });
            this.shutdown();
        });

        process.on('unhandledRejection', (reason, promise) => {
            this.logger.error('Unhandled Rejection', { reason, promise });
        });
    }

    public async start(): Promise<void> {
        console.log('\n=== Smart Office Facility Management System ===');
        console.log('Type "help" for available commands or "quit" to exit.\n');

        this.rl.prompt();

        this.rl.on('line', async (input) => {
            await this.handleInput(input.trim());
            if (this.isRunning) {
                this.rl.prompt();
            }
        });

        this.rl.on('close', () => {
            this.shutdown();
        });
    }

    private async handleInput(input: string): Promise<void> {
        if (!input) return;

        const lowerInput = input.toLowerCase();

        try {
            switch (lowerInput) {
                case 'help':
                    console.log(this.inputParser.getHelpText());
                    break;

                case 'quit':
                case 'exit':
                    this.isRunning = false;
                    this.rl.close();
                    break;

                case 'status':
                    this.displayRoomStatuses();
                    break;

                case 'clear':
                    console.clear();
                    break;

                default:
                    await this.executeCommand(input);
                    break;
            }
        } catch (error) {
            this.logger.error('Error handling input', { input, error });
            console.log(`Error: ${(error as Error).message}`);
        }
    }

    private async executeCommand(input: string): Promise<void> {
        const command = this.inputParser.parseInput(input);

        if (!command) {
            console.log('Invalid command. Type "help" for available commands.');
            return;
        }

        const result = await this.commandInvoker.executeCommand(command);

        if (result.success) {
            console.log(`✓ ${result.message}`);
        } else {
            console.log(`✗ ${result.message}`);
            if (result.error) {
                this.logger.error('Command execution error', { error: result.error });
            }
        }
    }

    private displayRoomStatuses(): void {
        try {
            const statuses = this.officeManager.getAllRoomStatuses();

            if (statuses.length === 0) {
                console.log('No rooms configured.');
                return;
            }

            console.log('\n=== Room Status Report ===');
            console.log('Room | Booked | Occupied | Occupancy | AC  | Lights | Capacity');
            console.log('-----|--------|----------|-----------|-----|--------|----------');

            statuses.forEach(status => {
                console.log(
                    `${status.roomId.toString().padEnd(4)} | ` +
                    `${(status.isBooked ? 'Yes' : 'No').padEnd(6)} | ` +
                    `${(status.isOccupied ? 'Yes' : 'No').padEnd(8)} | ` +
                    `${status.currentOccupancy.toString().padEnd(9)} | ` +
                    `${(status.acOn ? 'On' : 'Off').padEnd(3)} | ` +
                    `${(status.lightsOn ? 'On' : 'Off').padEnd(6)} | ` +
                    `${status.maxCapacity}`
                );
            });
            console.log('');
        } catch (error) {
            this.logger.error('Error displaying room statuses', { error });
            console.log('Error retrieving room statuses.');
        }
    }

    private shutdown(): void {
        if (!this.isRunning) return;

        this.isRunning = false;
        console.log('\nShutting down Smart Office Facility Application...');

        try {
            this.officeManager.dispose();
            this.rl.close();
            this.logger.info('Application shutdown completed');
            process.exit(0);
        } catch (error) {
            this.logger.error('Error during shutdown', { error });
            process.exit(1);
        }
    }
}

// Application entry point
async function main(): Promise<void> {
    try {
        const app = new SmartOfficeFacilityApp();
        await app.start();
    } catch (error) {
        console.error('Failed to start application:', error);
        process.exit(1);
    }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Start the application
if (require.main === module) {
    main().catch((error) => {
        console.error('Application startup failed:', error);
        process.exit(1);
    });
}
