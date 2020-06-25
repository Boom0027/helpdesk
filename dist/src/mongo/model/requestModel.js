"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const requestSchema_1 = __importDefault(require("../schema/requestSchema"));
exports.default = mongoose_1.model('request', requestSchema_1.default);
