/**
 * Twitter service
 * Author: Tirthamouli Baidya
 */

import { ITwitterAccountRpository } from '../types/repository/twitterAccountRepositoryInterface';

class TwitterService {
  /**
   * The twitter account repository
   */
  private twitterAccountRepository: ITwitterAccountRpository

  /**
   * Dependency injection
   * @param twitterAccountRepository
   */
  constructor(twitterAccountRepository: ITwitterAccountRpository) {
    this.twitterAccountRepository = twitterAccountRepository;
  }

  /**
   * Add a twitter user
   * @param token
   * @param tokenSecret
   * @param profile
   * @param done
   */
  async addTwitterAccount(token: string, tokenSecret: string,
    {
      id, username, displayName, photos,
    }:
    { id: string, username: string, displayName: string, photos:
      { value: string }[] | undefined, [a: string]:any }, done:(error: any, user?: any) => void) {
    // Step 1: Create userdetails
    const userdetails = {
      token,
      tokenSecret,
      profile: {
        id,
        username,
        displayName,
        photoURL: photos && photos.length >= 1 ? photos[0].value : '',
      },
    };

    // Step 1: Check if user already exists
    const oldUser = await this.twitterAccountRepository.getUserByID(id);
    if (oldUser) {
      // Step 1.1: Update the token and token secret
      const user = await this.twitterAccountRepository.updateUser(userdetails);

      // Step 1.2 Done
      return done(null, user);
    }

    // Step 2: Add the new user
    const user = await this.twitterAccountRepository.addUser(userdetails);

    // Step 3: Done
    return done(null, user);
  }
}

export default TwitterService;
