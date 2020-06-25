import express, { Request, Response, NextFunction } from 'express';
import initRoutes from './routes/index';
import './mongo/index';

// Step 1: Create new app
const app = express();

// Step 2: Error handling middleware
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: 'internal server error' });
});

// Step 3: Initialize routes
initRoutes(app);

// Step 4: Listen to port
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening to port 3000');
});
