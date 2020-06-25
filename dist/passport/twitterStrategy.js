"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_twitter_1 = require("passport-twitter");
const serviceFactory_1 = require("../factory/serviceFactory");
const { TWITTER_API_KEY, TWITTER_API_SECRET } = process.env;
passport_1.default.use(new passport_twitter_1.Strategy({
    consumerKey: TWITTER_API_KEY,
    consumerSecret: TWITTER_API_SECRET,
    callbackURL: 'http://localhost:3000/api/twitter/callback',
}, (token, tokenSecret, { id, username, displayName, photos, }, done) => serviceFactory_1.getTwitterService.addTwitterAccount(token, tokenSecret, {
    id, username, displayName, photos,
}, done)));
passport_1.default.serializeUser((user, cb) => {
    cb(null, user);
});
passport_1.default.deserializeUser((obj, cb) => {
    cb(null, obj);
});
