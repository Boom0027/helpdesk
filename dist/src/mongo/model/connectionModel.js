"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connectionSchema_1 = __importDefault(require("../schema/connectionSchema"));
exports.default = mongoose_1.model('connection', connectionSchema_1.default);
