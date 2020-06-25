/**
 * Initialize all the routers
 * Author: Tirthamouli Baidya
 */

import { Express } from 'express';

// Step 1: Get the routes
import authRoutes from './authRoutes';
import twitterRoutes from './twitterRoutes';

export default (app: Express) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/twitter', twitterRoutes);
};
