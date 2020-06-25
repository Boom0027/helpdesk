/**
 * Initialize passport
 * Author: Tirthamouli Baidya
 */
import { Express } from 'express';
import session from 'express-session';
import createMongoStore from 'connect-mongodb-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import './twitterStrategy';

export default (app: Express) => {
  // Step 1: Create a mongoDB store
  const MongoDBStore = createMongoStore(session);
  const store = new MongoDBStore({
    uri: process.env.MONGO_URI!,
    collection: 'session',
  });

  // Step 2: Use express-session for oauth
  app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
    store,
  }));

  // Step 3: Passport initialize
  app.use(passport.initialize());
  app.use(passport.session());

  // Step 4: Create urlencodedParser
  const urlencodedParser = bodyParser.urlencoded({ extended: true });

  // Step 5: Callback uri
  app.get('/', urlencodedParser,
    passport.authenticate('twitter', {
      successRedirect: '/hello',
      failureRedirect: '/login',
    }));
};
