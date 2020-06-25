/**
 * Twitter account Repository interface -
 * Methods required for creating, updating, deleting twitter accounts
 * Author: Tirthamouli
 */
import { ITwitterAccountSchema } from '../schema/twitterAccountSchemaInterface';

export interface ITwitterAccountRpository {
  /**
   * Create a new twitter user
   */
  addUser: (user: ITwitterAccountSchema) => Promise<ITwitterAccountSchema>

  /**
   * Get a user by their twitter user id
   */
  getUserByID: (userID: string) => Promise<ITwitterAccountSchema | null>

  /**
   * Upates all details of the user
   */
  updateUser: (user: ITwitterAccountSchema) => Promise<ITwitterAccountSchema>
}
