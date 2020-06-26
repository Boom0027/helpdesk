/**
 * Default error handler
 * Author: Tirthamouli
 */

import { Response } from 'express';

// Step 1: Registering error messages for code
const errorMessaages: {
  [key: string]: string
} = {
  400: 'bad request',
  403: 'forbidden',
  500: 'internal server error',
};

// Step 2: Export the handler
export default (err: Error, res: Response) => {
  // Step 1: Check if error is registered
  if (err.message in errorMessaages) {
    return res.status(+err.message).json({ message: errorMessaages[err.message] });
  }

  // Step 2: Default
  return res.status(500).json({ message: errorMessaages['500'] });
};
