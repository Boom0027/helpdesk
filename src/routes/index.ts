/**
 * Initialize all the routers
 * Author: Tirthamouli Baidya
 */

import { Express } from 'express';

// Step 1: Get the routes
import authRoutes from './authRoutes';
import twitterRoutes from './twitterRoutes';
import tweetRoutes from './tweetRoutes';

export default (app: Express) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/twitter', twitterRoutes);
  app.use('/api/tweet', tweetRoutes);
};
