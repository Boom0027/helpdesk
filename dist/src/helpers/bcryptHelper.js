"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.hash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const internalServerException_1 = __importDefault(require("../exception/internalServerException"));
function hash(password) {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.hash(password, +process.env.BCRYPT_SALT_ROUNDS, (err, hashedPassword) => {
            if (err) {
                return reject(new internalServerException_1.default('error during hash'));
            }
            return resolve(hashedPassword);
        });
    });
}
exports.hash = hash;
function compare(password, hashedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(password, hashedPassword, (err, result) => {
            if (err) {
                return reject(new internalServerException_1.default('error during hash'));
            }
            return resolve(result);
        });
    });
}
exports.compare = compare;
