"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema_1 = __importDefault(require("../schema/userSchema"));
exports.default = mongoose_1.model('user', userSchema_1.default);
