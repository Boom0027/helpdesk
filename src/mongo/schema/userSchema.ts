/**
 * User Schema - Contains the schema for users
 * Author: Tirthamouli Baidya
 */
import {
  Schema,
} from 'mongoose';

// Step 1: Schema definition
const userSchema = new Schema({
  /**
   * First name of the user
   */
  firstName: {
    type: String,
    required: true,
  },
  /**
   * Last name of the user
   */
  lastName: {
    type: String,
    required: true,
  },
  /**
   * Authentication details of the user
   */
  auth: {
    /**
     * Email - email of the user
     * Has to be unique
     */
    email: {
      type: String,
      required: true,
    },
    /**
     * Password - Stored hashed password of the user
     */
    password: {
      type: String,
      required: true,
    },
  },
  /**
   * Details about the twitter account which is being accessed
   */
  twitterDetails: {
    /**
     * Permission level of the user
     */
    permissionLevel: {
      type: String,
      enum: ['admin', 'user'], // Admin can add other users and reply to tweets and user can only reply to tweets
      required: true,
    },
    /**
     * Twitter account id
     */
    account: {
      type: Schema.Types.ObjectId,
      ref: 'twitter_account',
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

// Step 2: Adding index
userSchema.index({ 'auth.email': 1 }, { unique: true });
userSchema.index({ 'twitterDetails.account': 1, 'twitterDetails.permissionLevel': 1 });

// Step 3: Export
export default userSchema;
