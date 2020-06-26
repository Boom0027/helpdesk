/**
 * Tweet repository
 * Author: Tirthamouli Baidya
 */

// Step 1: Import model
import TweetModel from '../model/tweetModel';

// Step 2: Interface import
import { ITweetRepository, TTweet } from '../../types/repository/tweetRepositoryInterface';

// Step 3: Exceptions
import InternalServerException from '../../exception/internalServerException';

// Step 4: Define methods
const TweetRepository: ITweetRepository = {
  /**
   * Add new tweets
   * @param tweets
   */
  async addTweet(tweets: TTweet[]) {
    try {
      // Step 1: Add the tweets
      const newTweets = await TweetModel.insertMany(tweets);

      // Step 2: Format the output
      const formattedTweets = newTweets.map((tweet) => ({
        id: tweet.id,
        queryString: tweet.queryString,
        details: tweet.details,
        createdAt: tweet.createdAt,
      }));

      // Step 3: Return the tweet
      return formattedTweets;
    } catch (_err) {
      throw new InternalServerException('error while adding tweets');
    }
  },

  /**
   * Get the tweets for some query after the max id
   * If null return the last ones
   * @param query
   * @param maxId
   */
  async getTweets(query: string, maxId: string | null) {
    try {
      // Step 1: Get the tweets
      let tweets;
      if (maxId) {
        tweets = await TweetModel.find({ queryString: query, 'details.id': { $lt: maxId } }).sort(['details.id', -1]).limit(20);
      } else {
        tweets = await TweetModel.find({ queryString: query }).sort(['details.id', -1]).limit(20);
      }

      // Step 2: Format the output
      const formattedTweets = tweets.map((tweet) => ({
        id: tweet.id,
        queryString: tweet.queryString,
        details: tweet.details,
        createdAt: tweet.createdAt,
      }));

      // Step 3: Return the tweets
      return formattedTweets;
    } catch (_err) {
      throw new InternalServerException('error while fetching tweets by query');
    }
  },

  /**
   * Get reply tweets for a parent id after the max id
   * If null return the last ones
   * @param query
   * @param maxId
   */
  async getReplyTweets(parentTweetId: string, maxId: string | null) {
    try {
      // Step 1: Get the tweets
      let tweets;
      if (maxId) {
        tweets = await TweetModel.find({ 'details.inReplyTo': parentTweetId, 'details.id': { $lt: maxId } }).sort(['details.id', -1]).limit(20);
      } else {
        tweets = await TweetModel.find({ 'details.inReplyTo': parentTweetId }).sort(['details.id', -1]).limit(20);
      }

      // Step 2: Format the output
      const formattedTweets = tweets.map((tweet) => ({
        id: tweet.id,
        queryString: tweet.queryString,
        details: tweet.details,
        createdAt: tweet.createdAt,
      }));

      // Step 3: Return the tweets
      return formattedTweets;
    } catch (_err) {
      throw new InternalServerException('error while fetching tweets by query');
    }
  },
};
export default TweetRepository;
