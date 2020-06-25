/**
 * Twitter account repository
 * Author: Tirthamouli Baidya
 */

// Step 1: Import model
import TwitterAccountModel from '../model/twitterAccountModel';

// Step 2: Interface import
import { ITwitterAccountSchema } from '../../types/schema/twitterAccountSchemaInterface';
import { ITwitterAccountRpository } from '../../types/repository/twitterAccountRepositoryInterface';

// Step 3: Exceptions
import InternalServerException from '../../exception/internalServerException';

// Step 4: Define the functions
const TwitterAccountRepository : ITwitterAccountRpository = {
  /**
   * Add a new twitter user
   * @param token
   */
  async addUser(user: ITwitterAccountSchema) {
    try {
      // Step I: Create a new user
      const newUser = await new TwitterAccountModel(user).save();

      // Step II: Format and return the data
      return {
        id: newUser.id,
        token: newUser.token,
        tokenSecret: newUser.tokenSecret,
        profile: newUser.profile,
        createdAt: newUser.createdAt,
      };
    } catch (_err) {
      throw new InternalServerException('error while trying to create user');
    }
  },

  /**
   * Get twitter user by their user id
   * @param userID
   */
  async getUserByID(userID: string) {
    try {
      // Step I: Create a new user
      const user = await TwitterAccountModel.findOne({ 'profile.id': userID });

      // Step II: Check if user is found
      if (!user) {
        return null;
      }

      // Step III: Format and return the data
      return {
        id: user.id,
        token: user.token,
        tokenSecret: user.tokenSecret,
        profile: user.profile,
        createdAt: user.createdAt,
      };
    } catch (_err) {
      throw new InternalServerException('error while fetching user');
    }
  },

  /**
   * Update a user according to the new details
   * @param user
   */
  async updateUser(user: ITwitterAccountSchema) {
    try {
      // Step I: Update the user
      await TwitterAccountModel.updateOne({ 'profile.id': user.profile.id }, { $set: { ...user } });

      // Step II: Format and return the data
      return {
        token: user.token,
        tokenSecret: user.tokenSecret,
        profile: user.profile,
        createdAt: user.createdAt,
      };
    } catch (_err) {
      throw new InternalServerException('error while fetching user');
    }
  },
};

// Step 5: Export
export default TwitterAccountRepository;
