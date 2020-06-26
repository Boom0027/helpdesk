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

// Tweet service
import TweetService from '../service/tweetService';

// Exporting singleton dependencies
export const getTwitterService = new TwitterService(twitterAccountRepository);
export const getAuthService = new AuthService(userAccountRepository, twitterAccountRepository);
export const getTweetService = new TweetService();
