import 'babel-polyfill';
import 'babel-core/register';

import express from 'express';

import router from 'server/router';
import connectDB from 'server/config/db';
import { PORT } from 'server/config/constant';

const mark = `server started on port ${PORT}`;
console.time(mark);
const app = express();
connectDB();

if (process.env.NODE_ENV !== 'production') {
	app.use(require('morgan')('dev'));
} else {
	// production only middlewars
}

app.use(router);

app.listen(PORT, () => console.timeEnd(mark));