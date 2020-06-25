/**
 * Register passport-twitter strategy
 * Author: Tirthamouli Baidya
 */

import passport from 'passport';
import { Strategy } from 'passport-twitter';

// Step 1: Get the twitter service
import { getTwitterService } from '../factory/serviceFactory';

// Step 1: Get the keys
const { TWITTER_API_KEY, TWITTER_API_SECRET } = process.env;

// Step 2: Register strategy
passport.use(new Strategy({
  consumerKey: TWITTER_API_KEY!,
  consumerSecret: TWITTER_API_SECRET!,
  callbackURL: 'http://127.0.0.1:3000',
}, (token, tokenSecret, {
  id, username, displayName, photos,
}, done) => getTwitterService.addTwitterAccount(token, tokenSecret, {
  id, username, displayName, photos,
}, done)));
