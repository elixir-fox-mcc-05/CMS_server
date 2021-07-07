module.exports = (err, req, res, next) => {
	if (err.name === 'SequelizeUniqueConstraintError') {
		res.status(400).json({
			code: 400,
			type: 'BAD REQUEST',
			message: err.message
		});
	}

	if (err.name === 'SequelizeValidationError') {
		let message = err.errors.map((el) => ({
			message: el.message
		}));

		res.status(400).json({
			code: 400,
			type: 'BAD REQUEST',
			message
		});
	}

	if (err.name === 'JsonWebTokenError') {
		res.status(401).json({
			code: 401,
			type: 'UNAUTHORIZED',
			message: 'Please signin first!'
		});
	}

	res.status(err.code || 500).json({
		code: err.code || 500,
		type: err.type || 'INTERNAL SERVER ERROR',
		message: err.message || err
	});
};
