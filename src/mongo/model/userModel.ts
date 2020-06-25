/**
 * User Model - Model for the users
 * Author: Tirthamouli Baidya
 */
import {
  model, Document,
} from 'mongoose';
import { IUserSchema } from '../../types/schema/userSchemaInterface';
import userSchema from '../schema/userSchema';

// Step 1: Interface for the model
type TUser = Document & IUserSchema

// Step 1: Export the model
export default model<TUser>('user', userSchema);
