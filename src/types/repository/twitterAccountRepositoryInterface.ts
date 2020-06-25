/**
 * Twitter account Repository interface -
 * Methods required for creating, updating, deleting twitter accounts
 * Author: Tirthamouli
 */
import { ITwitterAccountSchema } from '../schema/twitterAccountSchemaInterface';

export interface ITokenRepository {
  /**
   * Create a new twitter user
   */
  createToken: (token: ITwitterAccountSchema) => Promise<ITwitterAccountSchema>
}
