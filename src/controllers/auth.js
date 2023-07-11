const { request, response } = require('express');

const postUser = (req = request, res = response) => {
	const { name, email, password } = req.body;

	return res
		.status(201)
		.json({ ok: true, msg: 'register', name, email, password });
};

const loginUser = (req = request, res = response) => {
	const { email, password } = req.body;

	return res.status(200).json({ ok: true, msg: 'login', email, password });
};

const renewToken = (req = request, res = response) => {
	return res.json({ ok: true, msg: 'renew' });
};

module.exports = {
	postUser,
	loginUser,
	renewToken,
};
