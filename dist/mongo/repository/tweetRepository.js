"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tweetModel_1 = __importDefault(require("../model/tweetModel"));
const internalServerException_1 = __importDefault(require("../../exception/internalServerException"));
const TweetRepository = {
    async addTweet(tweets) {
        try {
            const newTweets = await tweetModel_1.default.insertMany(tweets);
            const formattedTweets = newTweets.map((tweet) => ({
                id: tweet.id,
                queryString: tweet.queryString,
                details: tweet.details,
                createdAt: tweet.createdAt,
            }));
            return formattedTweets;
        }
        catch (_err) {
            throw new internalServerException_1.default('error while adding tweets');
        }
    },
    async getTweets(query, maxId) {
        try {
            let tweets;
            if (maxId) {
                tweets = await tweetModel_1.default.find({ queryString: query, 'details.id': { $lt: maxId } }).sort(['details.id', -1]).limit(20);
            }
            else {
                tweets = await tweetModel_1.default.find({ queryString: query }).sort(['details.id', -1]).limit(20);
            }
            const formattedTweets = tweets.map((tweet) => ({
                id: tweet.id,
                queryString: tweet.queryString,
                details: tweet.details,
                createdAt: tweet.createdAt,
            }));
            return formattedTweets;
        }
        catch (_err) {
            throw new internalServerException_1.default('error while fetching tweets by query');
        }
    },
    async getReplyTweets(parentTweetId, maxId) {
        try {
            let tweets;
            if (maxId) {
                tweets = await tweetModel_1.default.find({ 'details.inReplyTo': parentTweetId, 'details.id': { $lt: maxId } }).sort(['details.id', -1]).limit(20);
            }
            else {
                tweets = await tweetModel_1.default.find({ 'details.inReplyTo': parentTweetId }).sort(['details.id', -1]).limit(20);
            }
            const formattedTweets = tweets.map((tweet) => ({
                id: tweet.id,
                queryString: tweet.queryString,
                details: tweet.details,
                createdAt: tweet.createdAt,
            }));
            return formattedTweets;
        }
        catch (_err) {
            throw new internalServerException_1.default('error while fetching tweets by query');
        }
    },
};
exports.default = TweetRepository;
