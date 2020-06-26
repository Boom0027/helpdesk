/**
 * Internal server error, throw this in a function when there is
 * something wrong with the server working
 * Author: Tirthamouli Baidya
 */

import logger from '../logger/logger';

class InternalServer extends Error {
  /**
   * Status code of internal server error
   */
  public status = 500

  /**
   *
   * @param {String} message
   */
  constructor(message: string) {
    // Step 1: Call the parent constuctor
    super('500');

    // Step 2: Log the error
    logger.error(`ERROR 500: ${message}`);

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

export default InternalServer;
