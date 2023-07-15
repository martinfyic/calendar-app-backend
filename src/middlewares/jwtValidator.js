const { response } = require('express');
const jwt = require('jsonwebtoken');

const jwtValidator = (req, res = response, next) => {
	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: 'There is no token in the request',
		});
	}

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.uid = payload.uid;
		req.name = payload.name;
	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: 'Unauthorized user, invalid token',
		});
	}

	next();
};

module.exports = {
	jwtValidator,
};
