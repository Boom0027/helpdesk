/**
 * Token Repository interface - Methods required in token repository
 * Author: Tirthamouli
 */
import { ITokenInterface } from '../schema/tokenSchemaInterface';

export interface ITokenRepository {
  /**
   * Create a new token
   */
  createToken: (token: ITokenInterface) => Promise<ITokenInterface>
}
