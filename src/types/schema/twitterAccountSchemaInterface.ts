/**
 * Twitter account schema interface
 * Author: Tirthamouli Baidya
 */

export interface ITwitterAccountSchema {
  /**
   * Id of twitter account
   */
  id?: string

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
  profile: {
    /**
     * Twitter id
     */
    id: string

    /**
     * Twitter username
     */
    username: string

    /**
     * Twitter display name
     */
    displayName: string

    /**
     * Twitter phone
     */
    photoURL: string
  }

  /**
   * When the token is created
   */
  createdAt?: number
}
