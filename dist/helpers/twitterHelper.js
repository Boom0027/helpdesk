"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reply = exports.get = void 0;
const twit_1 = __importDefault(require("twit"));
const internalServerException_1 = __importDefault(require("../exception/internalServerException"));
const defaultOptions = {
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    timeout_ms: 60 * 1000,
    strictSSL: true,
};
function get(token, tokenSecret, displayName) {
    return new Promise((resolve, reject) => {
        const con = new twit_1.default({
            ...defaultOptions,
            access_token: token,
            access_token_secret: tokenSecret,
        });
        con.get('search/tweets', {
            q: 'superman',
            count: 20,
        }, (err, data, _response) => {
            if (err) {
                reject(new internalServerException_1.default(err.message));
            }
            resolve(data);
        });
    });
}
exports.get = get;
function reply(token, tokenSecret, status, parentTweetId) {
    return new Promise((resolve, reject) => {
        const con = new twit_1.default({
            ...defaultOptions,
            access_token: token,
            access_token_secret: tokenSecret,
        });
        con.post('statuses/update', {
            status,
            in_reply_to_status_id: parentTweetId,
        }, (err, data, _response) => {
            if (err) {
                reject(new internalServerException_1.default(err.message));
            }
            resolve(data);
        });
    });
}
exports.reply = reply;
