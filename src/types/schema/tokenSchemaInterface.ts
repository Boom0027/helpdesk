/**
 * Token schema interface - Token interface of the user
 */
import { IUserSchema } from './userSchemaInterface';

export interface ITokenInterface {
  /**
   * Id of the user
   */
  id?: string,

  /**
   * User whose token it is
   */
  user: IUserSchema

  /**
   * The token details
   */
  token: {
    /**
     * Type of the token
     */
    type: 'access' | 'refresh',
    /**
     * Value of the token
     */
    value: string
  }

  /**
   * When the token is created
   */
  createdAt?: number
}
