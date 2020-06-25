/**
 * Factory for initializing all the services
 * Author: Tirthamouli Baidya
 */

// Twitter service
import TwitterService from '../service/twitterService';
import twitterAccountRepository from '../mongo/repository/twitterAccountRepository';

// Auth service
import AuthService from '../service/authService';
import userAccountRepository from '../mongo/repository/userRepository';

// Exporting singleton dependencies
export const getTwitterService = new TwitterService(twitterAccountRepository);
export const getAuthService = new AuthService(userAccountRepository, twitterAccountRepository);
