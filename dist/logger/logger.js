"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
require("winston-daily-rotate-file");
const transport = new (winston_1.default.transports.DailyRotateFile)({
    filename: './logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '15d',
    handleExceptions: true,
});
const logger = winston_1.default.createLogger({
    level: 'debug',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), winston_1.default.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)),
    transports: [
        transport,
    ],
});
exports.default = logger;
