/**
 * Tweet repository interface
 * Methods for adding, and fetching tweet details
 */
import { ITweetSchema } from '../schema/tweetSchemaInterface';

export type TTweet = {
  /**
   * Query string
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

export interface ITweetRepository {
  /**
   * Add new tweets
   */
  addTweet : (tweets: TTweet[]) => Promise<ITweetSchema[]>

  /**
   * Get the tweets for some query after the max id
   * If null return the last ones
   */
  getTweets : (query: string, maxId: string | null) => Promise<ITweetSchema[]>

  /**
   * Get reply tweets for a parent id after the max id
   * If null return the last ones
   */
  getReplyTweets: (parentTweetId: string, maxId: string | null) => Promise<ITweetSchema[]>
}
