import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import 'dotenv/config';

// Step 1: Create new app
const app = express();

// Step 2: Use json parser
app.use(json());

// Step 3: Error handling middleware
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: 'internal server error' });
});

// Step 4: Listen to port
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening to port 3000');
});
