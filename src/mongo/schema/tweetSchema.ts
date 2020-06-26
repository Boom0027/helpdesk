/**
 * Tweet Schema - Contains the schema for individual tweets and replies
 * Author: Tirthamouli Baidya
 */
import {
  Schema,
} from 'mongoose';

// Step 1: Define schema
const tweetSchema = new Schema({
  /**
   * Query string for which the result was found
   */
  queryString: {
    type: String,
    required: true,
  },
  /**
   * Details about the tweet
   */
  details: {
    /**
     * Id of the tweet
     */
    id: {
      type: String,
      required: true,
    },
    /**
     * In reply to which tweet id
     */
    inReplyTo: {
      type: String,
      required: true,
    },
    /**
     * Text value of the tweet
     */
    text: {
      type: String,
      required: true,
    },
    /**
     * User details of the user
     * Since this is a demo application, we are not storing the user details in separate collection
     * That would make the user details consistent
     */
    user: {
      /**
       * Id of the user
       */
      id: {
        type: String,
        required: true,
      },
      /**
       * Name of the user
       */
      displayName: {
        type: String,
        required: true,
      },
      /**
       * Twitter username of the user
       */
      username: {
        type: String,
        required: true,
      },
      /**
       * Photo url of the user
       */
      photoURL: {
        type: String,
        required: true,
      },
      /**
       * Followers of the user
       */
      followers: {
        type: Number,
        required: true,
      },
      /**
       * How many user the user is following
       */
      following: {
        type: Number,
        required: true,
      },
    },
    /**
     * Created at time of the tweet
     */
    createdAt: {
      type: String,
      required: true,
    },
  },
});

// Step 2: Add index
tweetSchema.index({ queryString: 1, 'details.id': 1 }, { unique: true });
tweetSchema.index({ 'details.inReplyTo': 1 });

// Step 3: Export
export default tweetSchema;
