import winston, { Logger } from 'winston';
import path from 'path';

const logFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.prettyPrint()
);

const consoleFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message, service }) => {
        return `${timestamp} [${service || 'App'}] ${level}: ${message}`;
    })
);

export function createLogger(service: string): Logger {
    return winston.createLogger({
        level: process.env.LOG_LEVEL || 'info',
        format: logFormat,
        defaultMeta: { service },
        transports: [
            new winston.transports.File({
                filename: path.join('logs', 'error.log'),
                level: 'error'
            }),
            new winston.transports.File({
                filename: path.join('logs', 'combined.log')
            }),
            new winston.transports.Console({
                format: consoleFormat
            })
        ]
    });
}
