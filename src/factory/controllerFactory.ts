/**
 * Factory for initializing all the controllers
 * Author: Tirthamouli Baidya
 */

// Controllers
import AuthController from '../controller/authController';
import TweetController from '../controller/tweetController';

// Service layer
import { getAuthService, getTweetService } from './serviceFactory';

// Exporting singleton dependencies
export const getAuthController = new AuthController(getAuthService);
export const getTweetController = new TweetController(getTweetService);
