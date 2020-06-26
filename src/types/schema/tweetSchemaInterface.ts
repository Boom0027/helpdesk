/**
 * Tweet schema interface
 * Author: Tirthamouli Baidya
 */

export interface ITweetSchema {
  /**
   * ID of the tweet
   */
  id: string

  /**
   * Query string for which the result was found
   */
  queryString: string

  /**
   * Details about the tweet
   */
  details :{
    /**
     * id of the tweet
     */
    id: string

    /**
     * In reply to id
     */
    inReplyTo: string

    /**
     * Text value of the tweet
     */
    text: string

    /**
     * User details
     */
    user: {
      /**
       * id of the user
       */
      id: string

      /**
       * Display name of the user
       */
      displayName: string

      /**
       * Username of the user
       */
      username: string

      /**
       * Photo url of the user
       */
      photoURL: string

      /**
       * Follower count of the user
       */
      followers: number

      /**
       * Following count of the user
       */
      following: number
    }
  }

  /**
   * Created at for the string
   */
  createdAt: string
}
