"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const OfficeManager_1 = require("./core/OfficeManager");
const CommandInvoker_1 = require("./services/CommandInvoker");
const InputParser_1 = require("./services/InputParser");
const Logger_1 = require("./utils/Logger");
class SmartOfficeFacilityApp {
    constructor() {
        this.logger = (0, Logger_1.createLogger)('SmartOfficeFacilityApp');
        this.isRunning = true;
        this.ensureLogsDirectory();
        this.officeManager = OfficeManager_1.OfficeManager.getInstance();
        this.commandInvoker = new CommandInvoker_1.CommandInvoker();
        this.inputParser = new InputParser_1.InputParser(this.officeManager);
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: 'SmartOffice> '
        });
        this.setupSignalHandlers();
        this.logger.info('Smart Office Facility Application started');
    }
    ensureLogsDirectory() {
        const logsDir = path.join(process.cwd(), 'logs');
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
        }
    }
    setupSignalHandlers() {
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
    async start() {
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
    async handleInput(input) {
        if (!input)
            return;
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
        }
        catch (error) {
            this.logger.error('Error handling input', { input, error });
            console.log(`Error: ${error.message}`);
        }
    }
    async executeCommand(input) {
        const command = this.inputParser.parseInput(input);
        if (!command) {
            console.log('Invalid command. Type "help" for available commands.');
            return;
        }
        const result = await this.commandInvoker.executeCommand(command);
        if (result.success) {
            console.log(`✓ ${result.message}`);
        }
        else {
            console.log(`✗ ${result.message}`);
            if (result.error) {
                this.logger.error('Command execution error', { error: result.error });
            }
        }
    }
    displayRoomStatuses() {
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
                console.log(`${status.roomId.toString().padEnd(4)} | ` +
                    `${(status.isBooked ? 'Yes' : 'No').padEnd(6)} | ` +
                    `${(status.isOccupied ? 'Yes' : 'No').padEnd(8)} | ` +
                    `${status.currentOccupancy.toString().padEnd(9)} | ` +
                    `${(status.acOn ? 'On' : 'Off').padEnd(3)} | ` +
                    `${(status.lightsOn ? 'On' : 'Off').padEnd(6)} | ` +
                    `${status.maxCapacity}`);
            });
            console.log('');
        }
        catch (error) {
            this.logger.error('Error displaying room statuses', { error });
            console.log('Error retrieving room statuses.');
        }
    }
    shutdown() {
        if (!this.isRunning)
            return;
        this.isRunning = false;
        console.log('\nShutting down Smart Office Facility Application...');
        try {
            this.officeManager.dispose();
            this.rl.close();
            this.logger.info('Application shutdown completed');
            process.exit(0);
        }
        catch (error) {
            this.logger.error('Error during shutdown', { error });
            process.exit(1);
        }
    }
}
async function main() {
    try {
        const app = new SmartOfficeFacilityApp();
        await app.start();
    }
    catch (error) {
        console.error('Failed to start application:', error);
        process.exit(1);
    }
}
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
if (require.main === module) {
    main().catch((error) => {
        console.error('Application startup failed:', error);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map