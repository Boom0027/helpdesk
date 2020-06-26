/**
 * Handling auth routes
 * Author: Tirthamouli Baidya
 */

import express from 'express';
import bodyParser from 'body-parser';
import verifyAuth from '../middleware/authMiddleware';
import { getTweetController } from '../factory/controllerFactory';

// Step 1: Create a new router
const router = express.Router();

// Step 2: Using middlewares - json parser
router.use(bodyParser.json());
router.use(verifyAuth);

// Step 3: Registering routes
router.get('/get', getTweetController.getTweets.bind(getTweetController));

// Step 4: Exporting the router
export default router;
