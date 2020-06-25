/**
 * Handling auth routes
 * Author: Tirthamouli Baidya
 */

import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import createMongoStore from 'connect-mongodb-session';
import { signTwitterUser } from '../helpers/jwtHelper';
import '../passport/twitterStrategy';

// Step 1: Create a new router
const router = express.Router();

// Step 2: Create a mongoDB store
const MongoDBStore = createMongoStore(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URI!,
  collection: 'session',
});

// Step 3: Use express-session for oauth
router.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
  },
  store,
}));

// Step 4: Passport initialize
router.use(passport.initialize());
router.use(passport.session());

// Step 2: Using middlewares - json parser
router.use(bodyParser.urlencoded({ extended: true }));

// Step 3: Registering routes - oAuth
router.get('/auth', passport.authenticate('twitter'));

// Step 4: Callback uri
router.get('/callback',
  passport.authenticate('twitter'), async (req:any, res) => {
    // Step I: Check if user is there
    if (!('user' in req) || !('profile' in req.user) || !('displayName' in req.user.profile) || !('id' in req.user.profile) || !('oldUser' in req.user)) {
      return res.redirect('/register');
    }

    // Step 2: Sign the user
    const token = await signTwitterUser({
      twitterId: req.user.profile.id! as string,
      isRoot: true,
    });

    // Step 3: Check if token was created
    if (token && req.user.oldUser === true) {
      return res.redirect(`/login?token=${encodeURI(token)}`);
    } if (token && req.user.oldUser === false) {
      return res.redirect(`/register?token=${encodeURI(token)}`);
    }

    // Step 4: Default redirect
    return res.redirect('/register');
  });

// Step 5: Exporting the router
export default router;
