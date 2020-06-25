/**
 * Token Schema - Contains the token schema of the user
 * Author: Tirthamouli Baidya
 */
import {
  Schema,
} from 'mongoose';

// Step 1: Define schema
const tokenSchema = new Schema({
  /**
   * Whom the token belongs to
   */
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  /**
   * Contains token details
   */
  token: {
    /**
     * Type of the token can be access or refresh
     */
    type: {
      type: String,
      enum: ['access', 'refresh'],
      required: true,
    },
    /**
     * The actual value of the token
     */
    value: {
      type: String,
      required: true,
    },
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

// Step 2: Adding index
tokenSchema.index({ user: 1, createdAt: 1 });

// Step 3: Export
export default tokenSchema;
