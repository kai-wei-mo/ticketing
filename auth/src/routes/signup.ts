import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post(
	'/api/users/signup',
	[
		body('email')
			.isEmail()
			.withMessage('Please enter a valid email address'),
		body('password')
			.trim()
			.isLength({ min: 4, max: 20 })
			.withMessage('Please enter a password between 4 and 20 characters'),
	],
	(req: Request, res: Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		console.log('hello from signup');
		res.send('hello from signup');
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
