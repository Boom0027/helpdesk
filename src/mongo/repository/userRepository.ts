/**
 * User repository - Repository for user model
 */

// Step 1: Model import
import UserModel from '../model/userModel';

// Step 2: Interface import
import { IUserSchema } from '../../types/schema/userSchemaInterface';
import { IUserRepository } from '../../types/repository/userRepositoryInterface';

// Step 3: Exceptions
import InternalServerException from '../../exception/internalServerException';

// Step 4: Define the functions
const userRepository: IUserRepository = {
  /**
   * Create a new user
   * @param user
   */
  async createUser(user: IUserSchema) {
    try {
      // Step I: Create a new user
      const newUser = await new UserModel(user).save();

      // Step II: Format and return the data
      return {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        auth: {
          email: newUser.auth.email,
        },
        twitterDetails: newUser.twitterDetails,
      };
    } catch (_err) {
      throw new InternalServerException('error while trying to create user');
    }
  },

  /**
   * Get user by email
   * @param email
   */
  async getUserByEmail(email: string) {
    try {
      // Step I: Get the user
      const user = await UserModel.findOne({ 'auth.email': email });

      // Step II: Check if we have received an user
      if (!user) {
        return null;
      }

      // Step III: Return the user
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        auth: user.auth,
        twitterDetails: user.twitterDetails,
        createdAt: user.createdAt,
      };
    } catch (_err) {
      throw new InternalServerException('error while fetching user by email');
    }
  },
};

// Step 5: Export
export default userRepository;
