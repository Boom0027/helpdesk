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
  callbackURL: 'http://localhost:3000/api/twitter/callback',
}, (token, tokenSecret, {
  id, username, displayName, photos,
}, done) => getTwitterService.addTwitterAccount(token, tokenSecret, {
  id, username, displayName, photos,
}, done)));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});
