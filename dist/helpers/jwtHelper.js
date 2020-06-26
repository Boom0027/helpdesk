"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTwitterUser = exports.signTwitterUser = exports.verifyUser = exports.signUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const internalServerException_1 = __importDefault(require("../exception/internalServerException"));
function signUser(user) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign({ user }, process.env.JWT_SECRET, {
            algorithm: 'HS512',
            expiresIn: '1d',
        }, (err, token) => {
            if (err) {
                reject(new internalServerException_1.default('unable to sign jwt token'));
            }
            resolve(token);
        });
    });
}
exports.signUser = signUser;
function verifyUser(token) {
    return new Promise((resolve) => {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, authData) => {
            if (err) {
                resolve(null);
            }
            if (!authData || !('user' in authData)) {
                return resolve(null);
            }
            const formattedAuth = authData;
            return resolve(formattedAuth.user);
        });
    });
}
exports.verifyUser = verifyUser;
function signTwitterUser(user) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign({ user }, process.env.JWT_SECRET, {
            algorithm: 'HS512',
            expiresIn: '1d',
        }, (err, token) => {
            if (err) {
                reject(new internalServerException_1.default('unable to sign jwt token'));
            }
            resolve(token);
        });
    });
}
exports.signTwitterUser = signTwitterUser;
function verifyTwitterUser(token) {
    return new Promise((resolve) => {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, authData) => {
            if (err) {
                return resolve(null);
            }
            if (!authData || !('user' in authData)) {
                return resolve(null);
            }
            const formattedAuth = authData;
            return resolve(formattedAuth.user);
        });
    });
}
exports.verifyTwitterUser = verifyTwitterUser;
