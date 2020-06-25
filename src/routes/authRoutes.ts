
/**
 * Handling auth routes
 * Author: Tirthamouli Baidya
 */

import express from 'express';
import bodyParser from 'body-parser';

// Step 1: Create a new router
const router = express.Router();

// Step 2: Using middlewares - json parser
router.use(bodyParser.json());

// Step 3: Registering routes

// Step 4: Exporting the router
export default router;
