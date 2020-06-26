/**
 * Tweet Model - Model for the tweets
 * Author: Tirthamouli Baidya
 */
import {
  model, Document,
} from 'mongoose';
import { ITweetSchema } from '../../types/schema/tweetSchemaInterface';
import tweetSchema from '../schema/tweetSchema';

// Step 1: Interface for the model
type TTweet = Document & ITweetSchema

// Step 1: Export the model
export default model<TTweet>('tweet', tweetSchema);
