import mongoose from 'mongoose';
import { DEVELOPMENT_DB, PRODUCTION_DB } from 'server/config/constant';

const DB_OPTIONS = {
	server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 }},
	replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 }}
};

export default function connectDB(){
	console.time('mongodb connected');
	mongoose.Promise = global.Promise;

	if (process.env.NODE_ENV !== 'production') {
		mongoose.connect(DEVELOPMENT_DB, DB_OPTIONS);
		mongoose.set('debug', true);
	}
	else {
		mongoose.connect(PRODUCTION_DB, DB_OPTIONS);
	}

	mongoose.connection.on('connected', () => {
		console.timeEnd('mongodb connected');
	});

	return mongoose.connection;
}