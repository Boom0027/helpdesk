"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthController = void 0;
const authController_1 = __importDefault(require("../controller/authController"));
const serviceFactory_1 = require("./serviceFactory");
exports.getAuthController = new authController_1.default(serviceFactory_1.getAuthService);
