"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twitterHelper_1 = require("../helpers/twitterHelper");
class TweetService {
    async getTweets(token, tokenSecret, twitterDisplayName) {
        const data = await twitterHelper_1.get(token, tokenSecret, twitterDisplayName);
        console.log(data);
        return true;
    }
}
exports.default = TweetService;
