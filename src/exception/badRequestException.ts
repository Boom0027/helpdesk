/**
 * Bad Request error, throw this in a function when there is something wrong with the request params
 * Author: Tirthamouli Baidya
 */

import logger from '../logger/logger';

class BadRequest extends Error {
  /**
   * The status code
   */
  public status = 400

  /**
   *
   * @param {String} message
   */
  constructor(message: string) {
    // Step 1: Call the parent constuctor
    super('400');

    // Step 2: Log the error
    logger.error(`ERROR 400: ${message}`);

    // Step 2: Set the name
    this.name = this.constructor.name;
  }

  /**
   * Get the status code
   */
  statusCode() {
    return this.status;
  }
}

export default BadRequest;
