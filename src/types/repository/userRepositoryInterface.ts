/**
 * User Repository interface - Methods required in user repository
 * Author: Tirthamouli
 */
import { IUserSchema } from '../schema/userSchemaInterface';

export interface IUserRepository {
  /**
   * Create a new user
   */
  createUser: (user: IUserSchema) => Promise<IUserSchema>

  /**
   * Get user by email
   */
  getUserByEmail: (email: string) => Promise<IUserSchema | null>
}
