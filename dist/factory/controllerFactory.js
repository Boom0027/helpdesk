"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTweetController = exports.getAuthController = void 0;
const authController_1 = __importDefault(require("../controller/authController"));
const tweetController_1 = __importDefault(require("../controller/tweetController"));
const serviceFactory_1 = require("./serviceFactory");
exports.getAuthController = new authController_1.default(serviceFactory_1.getAuthService);
exports.getTweetController = new tweetController_1.default(serviceFactory_1.getTweetService);
