import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';

import { currentUserRouter } from './routes/currentUser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

import { NotFoundError } from './errors/notFoundError';

import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
	throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
	try {
		await mongoose.connect('mongodb://auth-mongo-svc:27017/auth');
	} catch (err) {
		console.error(err);
	}

	app.listen(3000, () => {
		console.log('Server is running on port 3000');
	});
};

start();
