import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { BadRequestError } from '../errors/badRequestError';
import { RequestValidationError } from '../errors/requestValidationError';

import { User } from '../models/user';

const router = express.Router();

router.post(
	'/api/users/signup',
	[
		body('email').isEmail().withMessage('Email must be valid'),
		body('password')
			.trim()
			.isLength({ min: 4, max: 20 })
			.withMessage('Password must be between 4 and 20 characters'),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			throw new RequestValidationError(errors.array());
		}

		const { email, password } = req.body;

		// if user exists
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			throw new BadRequestError('Email in use');
		}

		const user = User.build({ email, password });
		await user.save();

		res.status(201).send(user);
	}
);

export { router as signupRouter };

/*
GOOD
curl -X POST -H "Content-Type: application/json" -d '{"email":"kw2mo@uwaterloo.ca", "password":"password"}' http://ticketing.dev/api/users/signup

BAD EMAIL
curl -X POST -H "Content-Type: application/json" -d '{"email":"i love mangoes", "password":"password"}' http://ticketing.dev/api/users/signup

BAD PASSWORD
curl -X POST -H "Content-Type: application/json" -d '{"email":"kw2mo@uwaterloo.ca", "password":"this-password-is-way-too-long-oh-no"}' http://ticketing.dev/api/users/signup
*/
