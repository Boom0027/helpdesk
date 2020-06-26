/**
 * Tweet controller
 * Author: Tirthamouli Baidya
 */
// Types
import { Request, Response } from 'express';

// Service layer
import { ITweetService } from '../types/service/tweetServiceInterface';

class TweetControll {
  /**
   * Tweet service layer
   */
  private tweetService: ITweetService

  /**
   * Dependency injection
   * @param tweetService
   */
  constructor(tweetService: ITweetService) {
    this.tweetService = tweetService;
  }

  /**
   * Get the tweets about the user, store in data base if not stored
   * @param req
   * @param res
   */
  async getTweets({ user }: Request, res: Response) {
    // Step 1: Type casting
    const formattedUser = user as { twitterName: string, token: string, tokenSecret: string };
    if (formattedUser && 'twitterName' in formattedUser && 'token' in formattedUser && 'tokenSecret' in formattedUser) {
      await this.tweetService.getTweets(formattedUser.token,
        formattedUser.tokenSecret, formattedUser.twitterName);
    }
    res.send('DONE');
  }
}
export default TweetControll;
