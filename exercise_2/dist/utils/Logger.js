"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = createLogger;
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const logFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
}), winston_1.default.format.errors({ stack: true }), winston_1.default.format.json(), winston_1.default.format.prettyPrint());
const consoleFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
}), winston_1.default.format.colorize(), winston_1.default.format.printf(({ timestamp, level, message, service }) => {
    return `${timestamp} [${service || 'App'}] ${level}: ${message}`;
}));
function createLogger(service) {
    return winston_1.default.createLogger({
        level: process.env.LOG_LEVEL || 'info',
        format: logFormat,
        defaultMeta: { service },
        transports: [
            new winston_1.default.transports.File({
                filename: path_1.default.join('logs', 'error.log'),
                level: 'error'
            }),
            new winston_1.default.transports.File({
                filename: path_1.default.join('logs', 'combined.log')
            }),
            new winston_1.default.transports.Console({
                format: consoleFormat
            })
        ]
    });
}
//# sourceMappingURL=Logger.js.map