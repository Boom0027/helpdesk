/**
 * Handling auth routes
 * Author: Tirthamouli Baidya
 */

import express from 'express';
import bodyParser from 'body-parser';
import { getAuthController } from '../factory/controllerFactory';

// Step 1: Create a new router
const router = express.Router();

// Step 2: Using middlewares - json parser
router.use(bodyParser.json());

// Step 3: Registering routes
router.post('/login', getAuthController.login.bind(getAuthController));
router.post('/register', getAuthController.register.bind(getAuthController));

// Step 4: Exporting the router
export default router;
