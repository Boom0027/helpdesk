"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoutes_1 = __importDefault(require("./authRoutes"));
const twitterRoutes_1 = __importDefault(require("./twitterRoutes"));
const tweetRoutes_1 = __importDefault(require("./tweetRoutes"));
exports.default = (app) => {
    app.use('/api/auth', authRoutes_1.default);
    app.use('/api/twitter', twitterRoutes_1.default);
    app.use('/api/tweet', tweetRoutes_1.default);
};
