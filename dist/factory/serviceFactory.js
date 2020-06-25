"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTwitterService = void 0;
const twitterService_1 = __importDefault(require("../service/twitterService"));
const twitterAccountRepository_1 = __importDefault(require("../mongo/repository/twitterAccountRepository"));
exports.getTwitterService = new twitterService_1.default(twitterAccountRepository_1.default);
