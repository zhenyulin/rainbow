import 'babel-polyfill';

import express from 'express';

import router from 'server/router';
import connectDB from 'server/config/db';

const app = express();
connectDB();

if (process.env.NODE_ENV === 'development') {
  app.use(require('morgan')('dev'));
}

app.use(router);

export default app;
