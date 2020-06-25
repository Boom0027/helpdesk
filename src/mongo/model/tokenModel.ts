/**
 * Token Model - Model for the token
 * Author: Tirthamouli Baidya
 */
import {
  model, Document,
} from 'mongoose';
import tokenSchema from '../schema/tokenSchema';
import { ITokenInterface } from '../../types/schema/tokenSchemaInterface';

// Step 1: Define type
type IToken = Document & ITokenInterface

// Step 2: Export the model
export default model<IToken>('token', tokenSchema);
