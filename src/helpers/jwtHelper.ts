/**
 * JWT Helper
 * Author: Tirthamouli Baidya
 */
import jwt from 'jsonwebtoken';
import InternalServer from '../exception/internalServerException';

/**
 * Type of the stored data in JWT
 */
type TstoredData = { id: string, email: string }

/**
 * Sign a JWT Token
 * @param {Object} user
 */
export function signUser(user: TstoredData): Promise<string | undefined> {
  // Step 1: Promise wrapper
  return new Promise((resolve, reject) => {
    // Step 2: Sign using async method
    jwt.sign({ user }, process.env.JWT_SECRET!, {
      algorithm: 'HS512',
      expiresIn: '1d',
    }, (err, token) => {
      // Step 3: Check for any errors
      if (err) {
        reject(new InternalServer('unable to sign jwt token'));
      }

      // Step 4: Resolve the data
      resolve(token);
    });
  });
}

/**
 * Verify a JWT Token
 * @param {Object} user
 */
export function verifyUser(token: string): Promise<TstoredData | null> {
  // Step 1: Promise wrapper
  return new Promise((resolve) => {
    // Step 2: Verify the token
    jwt.verify(token, process.env.JWT_SECRET!, (err, authData) => {
      // Step 3: In case of error, token is incorrect
      if (err) {
        resolve(null);
      }

      // Step 4: Resolve the data
      resolve(authData as TstoredData);
    });
  });
}

type TtwutterUser = { twitterId: string }

/**
 * Sign a twitter user
 * @param user
 */
export function signTwitterUser(user: TtwutterUser): Promise<string | null> {
  // Step 1: Promise wrapper
  return new Promise((resolve, reject) => {
    // Step 2: Sign using async method
    jwt.sign({ user }, process.env.JWT_SECRET!, {
      algorithm: 'HS512',
      expiresIn: '1m',
    }, (err, token) => {
      // Step 3: Check for any errors
      if (err) {
        reject(new InternalServer('unable to sign jwt token'));
      }

      // Step 4: Resolve the data
      resolve(token);
    });
  });
}

/**
 * Verify a JWT Token
 * @param {Object} user
 */
export function verifyTwitterUser(token: string): Promise<TtwutterUser | null> {
  // Step 1: Promise wrapper
  return new Promise((resolve) => {
    // Step 2: Verify the token
    jwt.verify(token, process.env.JWT_SECRET!, (err, authData) => {
      // Step 3: In case of error, token is incorrect
      if (err) {
        resolve(null);
      }

      // Step 4: Resolve the data
      resolve(authData as TtwutterUser);
    });
  });
}
