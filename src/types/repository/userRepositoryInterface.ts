/**
 * User Repository interface - Methods required in user repository
 * Author: Tirthamouli
 */
import { IUserSchema } from '../schema/userSchemaInterface';

export interface IUserRepository {
  /**
   * Create a new user
   */
  createUser: (firstName: string, lastName: string, email: string,
    password: string, twitterAccountID: string, twitterPermissionLevel: 'admin' | 'user') => Promise<IUserSchema>

  /**
   * Get user by email
   */
  getUserByEmail: (email: string) => Promise<IUserSchema | null>

  /**
   * Get the root user by id
   */
  getRootUserForTwitterAccount: (id: string) => Promise<IUserSchema | null>
}
