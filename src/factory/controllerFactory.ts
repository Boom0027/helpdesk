/**
 * Factory for initializing all the controllers
 * Author: Tirthamouli Baidya
 */

// Controllers
import AuthController from '../controller/authController';

// Service layer
import { getAuthService } from './serviceFactory';

// Exporting singleton dependencies
// eslint-disable-next-line import/prefer-default-export
export const getAuthController = new AuthController(getAuthService);
