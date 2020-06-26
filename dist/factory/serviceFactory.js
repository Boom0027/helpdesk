"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTweetService = exports.getAuthService = exports.getTwitterService = void 0;
const twitterService_1 = __importDefault(require("../service/twitterService"));
const twitterAccountRepository_1 = __importDefault(require("../mongo/repository/twitterAccountRepository"));
const authService_1 = __importDefault(require("../service/authService"));
const userRepository_1 = __importDefault(require("../mongo/repository/userRepository"));
const tweetService_1 = __importDefault(require("../service/tweetService"));
exports.getTwitterService = new twitterService_1.default(twitterAccountRepository_1.default);
exports.getAuthService = new authService_1.default(userRepository_1.default, twitterAccountRepository_1.default);
exports.getTweetService = new tweetService_1.default();
