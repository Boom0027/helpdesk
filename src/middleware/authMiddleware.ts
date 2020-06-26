/**
 * Auth middleware
 * Author: Tirthamouli Baidya
 */

import { Request, Response, NextFunction } from 'express';
import { verifyUser } from '../helpers/jwtHelper';
import handleError from '../helpers/handleError';

// Custom errors
import Forbidden from '../exception/forbiddenException';

/**
 * Verify token middleware
 * @param req
 * @param res
 * @param next
 */
export default async function verifyToken(req: Request, res: Response, next: NextFunction) {
// Step 1: Get the auth header value
  const bearerHeader = req.headers.authorization;

  // Step 2: Check if bearer is undefined
  if (typeof bearerHeader === 'undefined') {
    // Step 2.1: Forbidden at this point
    throw new Forbidden('no auth token found');
  }

  // Step 3: Split at space. Token looks like Bearer <access_token>
  const bearer = bearerHeader.split(' ');

  // Step 4: Check if there is a second part
  if (bearer.length < 1) {
    // Step 4.1: Forbidden at this point
    throw new Forbidden('wrong auth token format');
  }

  // Step 5: Get the second part
  const [, token] = bearer;

  // Step 6: Verify the token
  try {
    // Step 6.1: Verify the token
    const user = await verifyUser(token);

    // Step 6.3: Check if there is an user
    if (!user) {
      throw new Forbidden('invalid token');
    }

    // Step 6.2: Set the req
    req.user = user;
  } catch (error) {
    // Step 6.1: Incase of error, handle error
    return handleError(error, res);
  }

  // Step 6: Go to next
  return next();
}
