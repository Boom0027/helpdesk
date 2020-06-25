/**
 * Twitter Account Model - Model for the twitter user
 * Author: Tirthamouli Baidya
 */
import {
  model, Document,
} from 'mongoose';
import { ITwitterAccountSchema } from '../../types/schema/twitterAccountSchemaInterface';
import twitterSchema from '../schema/twitterAccountSchema';

// Step 1: Interface for the model
type TTwitterAccount = Document & ITwitterAccountSchema

// Step 1: Export the model
export default model<TTwitterAccount>('twitter_account', twitterSchema);
