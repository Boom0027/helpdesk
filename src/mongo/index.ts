/**
 * Connecting to mongoDB
 * Author: Tirthamouli
 */

import mongoose from 'mongoose';

// Connecting to mongoDB
mongoose.connect(process.env.MONGO_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: +process.env.MONGO_POOL_SIZE!, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
}, (err) => {
  if (err) {
    throw new Error('Not able to connect to mongoDB');
  }
  // eslint-disable-next-line no-console
  console.log('Connected to mongoDB');
});
