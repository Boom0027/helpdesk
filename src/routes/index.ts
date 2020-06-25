/**
 * Initialize all the routers
 * Author: Tirthamouli Baidya
 */

import express, { Express } from 'express';

export default (app: Express) => {
  app.use(express.static('dist'));
};
