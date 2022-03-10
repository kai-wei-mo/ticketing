import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/customError';

/*
error handling middleware to intercept errors thrown by the application
formalize an generic error structure to be used universally

{
	errors: {
		message: string,
		field?: string
	}[]
}
*/

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof CustomError) {
		return res
			.status(err.statusCode)
			.send({ errors: err.serializeErrors() });
	}

	res.status(400).send({
		errors: [{ message: 'Something went wrong' }],
	});
};
