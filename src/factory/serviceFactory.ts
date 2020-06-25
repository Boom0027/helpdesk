/**
 * Factory for initializing all the services
 * Author: Tirthamouli Baidya
 */

// Twitter service
import TwitterService from '../service/twitterService';
import twitterAccountRepository from '../mongo/repository/twitterAccountRepository';

// Exporting singleton dependencies
// eslint-disable-next-line import/prefer-default-export
export const getTwitterService = new TwitterService(twitterAccountRepository);
