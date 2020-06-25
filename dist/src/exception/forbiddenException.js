"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger/logger"));
class Forbidden extends Error {
    constructor(message) {
        super('forbidden');
        this.status = 403;
        logger_1.default.error(`ERROR 403: ${message}`);
        this.name = this.constructor.name;
    }
    statusCode() {
        return this.status;
    }
}
exports.default = Forbidden;
