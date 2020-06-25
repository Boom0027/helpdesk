/**
 * Twitter account schema interface
 * Author: Tirthamouli Baidya
 */

export interface ITwitterAccountSchema {
  /**
   * The token details
   */
  token: string

  /**
   * Token secret
   */
  tokenSecret: string

  /**
   * Profile details of the user
   */
  profile: any

  /**
   * When the token is created
   */
  createdAt?: number
}
