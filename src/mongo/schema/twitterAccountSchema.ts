/**
 * Twitter Account Schema - Contains the schema for twitter oAuth
 * Author: Tirthamouli Baidya
 */
import {
  Schema,
} from 'mongoose';

// Step 1: Schema definition
const twitterAccountSchema = new Schema({
  /**
   * Token of the user
   */
  token: {
    type: String,
    required: true,
  },
  /**
   * Token secret of the user
   */
  tokenSecret: {
    type: String,
    required: true,
  },
  /**
   * Profile details of the user
   */
  profile: {
    /**
     * Twitter id
     */
    id: {
      type: String,
      required: true,
    },
    /**
     * Twitter with username
     */
    username: {
      type: String,
      required: true,
    },
    /**
     * Display name in twitter
     */
    displayName: {
      type: String,
      required: true,
    },
    /**
     * Photo url of the twitter account
     */
    photoURL: {
      type: String,
      required: true,
    },
  },
  /**
   * Created at timestamp
   */
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Step 2: Add index
twitterAccountSchema.index({ 'profile.id': 1 }, { unique: true });

// Step 3: Export
export default twitterAccountSchema;
