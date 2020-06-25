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
    type: Object,
    required: true,
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

// Step 3: Export
export default twitterAccountSchema;
