"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtHelper_1 = require("../helpers/jwtHelper");
const handleError_1 = __importDefault(require("../helpers/handleError"));
const forbiddenException_1 = __importDefault(require("../exception/forbiddenException"));
async function verifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader === 'undefined') {
        throw new forbiddenException_1.default('no auth token found');
    }
    const bearer = bearerHeader.split(' ');
    if (bearer.length < 1) {
        throw new forbiddenException_1.default('wrong auth token format');
    }
    const [, token] = bearer;
    try {
        const user = await jwtHelper_1.verifyUser(token);
        if (!user) {
            throw new forbiddenException_1.default('invalid token');
        }
        req.user = user;
    }
    catch (error) {
        return handleError_1.default(error, res);
    }
    return next();
}
exports.default = verifyToken;
