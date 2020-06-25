"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
require("./twitterStrategy");
exports.default = (app) => {
    const MongoDBStore = connect_mongodb_session_1.default(express_session_1.default);
    const store = new MongoDBStore({
        uri: process.env.MONGO_URI,
        collection: 'session',
    });
    app.use(express_session_1.default({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
            secure: false,
        },
        store,
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    const urlencodedParser = body_parser_1.default.urlencoded({ extended: true });
    app.get('/', urlencodedParser, passport_1.default.authenticate('twitter', {
        successRedirect: '/hello',
        failureRedirect: '/login',
    }));
};
