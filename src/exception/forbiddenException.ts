/**
 * Forbidden error, throw this in a function when user doesn't have access
 * Author: Tirthamouli Baidya
 */

import logger from '../logger/logger';

class Forbidden extends Error {
  /**
   * Forbidden status code
   */
  public status = 403

  /**
   *
   * @param {String} message
   */
  constructor(message: string) {
    // Step 1: Call the parent constuctor
    super('forbidden');

    // Step 2: Log the error
    logger.error(`ERROR 403: ${message}`);

    // Step 3: Set the name
    this.name = this.constructor.name;
  }

  /**
   * Get the status code
   */
  statusCode() {
    return this.status;
  }
}

export default Forbidden;
