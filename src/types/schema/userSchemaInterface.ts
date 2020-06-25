/**
 * User schema interface - The data type of users
 */
import { ITwitterAccountSchema } from './twitterAccountSchemaInterface';

export interface IUserSchema {
  /**
   * ID of the user
   */
  id: string,

  /**
   * First name of the user
   */
  firstName: string

  /**
   * Last name of the user
   */
  lastName: string

  /**
   * Auth details of the user
   */
  auth: {
    /**
     * Email of the user
     */
    email: string

    /**
     * Password of the user
     */
    password?: string
  },

  /**
   * Twitter details about the user
   */
  twitterDetails: {
    /**
     * Permission level of the user
     */
    permissionLevel: 'admin' | 'user'

    /**
     * Account of the user
     */
    account: ITwitterAccountSchema
  }

  /**
   * When the user is created
   */
  createdAt?: number
}
