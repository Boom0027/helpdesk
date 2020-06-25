/**
 * Bcrypt helper
 * Author: Tirthamouli Baidya
 */

import bcrypt from 'bcrypt';
import InternalServer from '../exception/internalServerException';

/**
 * Hash the password
 * @param password
 */
export function hash(password: string): Promise<string> {
  // Step 1: Create a promise wrapper
  return new Promise((resolve, reject) => {
    // Step 2: Hash the password
    bcrypt.hash(password, +process.env.BCRYPT_SALT_ROUNDS!, (err, hashedPassword) => {
      // Step 3: Incase of any error, throw a new error
      if (err) {
        return reject(new InternalServer('error during hash'));
      }

      // Step 4: Resolve when there is no error
      return resolve(hashedPassword);
    });
  });
}

/**
 * Compare password and hash
 * @param {String} password
 * @param {String} hash
 */
export function compare(password: string, hashedPassword: string): Promise<boolean> {
  // Step 1: Create a promise wrapper
  return new Promise((resolve, reject) => {
    // Step 2: Compare the password
    bcrypt.compare(password, hashedPassword, (err, result) => {
      // Step 3: Incase of any error, throw a new error
      if (err) {
        return reject(new InternalServer('error during hash'));
      }

      // Step 4: Resolve when there is no error - True or false result
      return resolve(result);
    });
  });
}
