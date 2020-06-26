/**
 * Twitter helper function
 * Author: Tirthamouli Baidya
 */

import Twit from 'twit';

// Exceptions
import InternalServerError from '../exception/internalServerException';

/**
 * Default options for connection
 */
const defaultOptions = {
  consumer_key: process.env.TWITTER_API_KEY!,
  consumer_secret: process.env.TWITTER_API_SECRET!,
  timeout_ms: 60 * 1000,
  strictSSL: true,
};

/**
 * Get tweets
 * @param token
 * @param tokenSecret
 * @param displayName
 */
export function get(token: string, tokenSecret: string, displayName: string) {
  return new Promise((resolve, reject) => {
    // Step 1: Create a new twitter con
    const con = new Twit({
      ...defaultOptions,
      access_token: token,
      access_token_secret: tokenSecret,
    });

    con.get('search/tweets', {
      q: 'superman',
      count: 20,
    }, (err, data, _response) => {
      // Step 1: Check if there is an error
      if (err) {
        reject(new InternalServerError(err.message));
      }

      // Step 2: Resolve data
      resolve(data.statuses[0].user);
    });
  });
}

/**
 * Post reply for a tweet
 * @param token
 * @param tokenSecret
 * @param status
 * @param parentTweetId
 */
export function reply(token: string, tokenSecret: string, status: string, parentTweetId: string) {
  return new Promise((resolve, reject) => {
    // Step 1: Create a new twitter con
    const con = new Twit({
      ...defaultOptions,
      access_token: token,
      access_token_secret: tokenSecret,
    });

    // Step 2: Post the status as reply
    con.post('statuses/update', {
      status,
      in_reply_to_status_id: parentTweetId,
    }, (err, data, _response) => {
      // Step 1: Check if there is an error
      if (err) {
        reject(new InternalServerError(err.message));
      }

      // Step 2: Resolve data
      resolve(data);
    });
  });
}
