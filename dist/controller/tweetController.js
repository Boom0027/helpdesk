"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TweetControll {
    constructor(tweetService) {
        this.tweetService = tweetService;
    }
    async getTweets({ user }, res) {
        const formattedUser = user;
        if (formattedUser && 'twitterName' in formattedUser && 'token' in formattedUser && 'tokenSecret' in formattedUser) {
            await this.tweetService.getTweets(formattedUser.token, formattedUser.tokenSecret, formattedUser.twitterName);
        }
        res.send('DONE');
    }
}
exports.default = TweetControll;
