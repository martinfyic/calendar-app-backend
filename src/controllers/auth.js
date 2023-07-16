const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const postUser = async (req = request, res = response) => {
	const { email, password } = req.body;
	try {
		let user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({
				ok: false,
				msg: 'The email is already registered',
				method: req.method,
				hostname: req.hostname,
				originalUrl: req.originalUrl,
				baseUrl: req.baseUrl,
				path: req.path,
			});
		}

		user = new User(req.body);

		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

		await user.save();

		const token = await generateJWT(user.id, user.name);

		return res.status(201).json({
			ok: true,
			msg: 'User successfully registered',
			method: req.method,
			hostname: req.hostname,
			originalUrl: req.originalUrl,
			baseUrl: req.baseUrl,
			path: req.path,
			user: {
				uid: user.id,
				name: user.name,
				token,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Internal error, talk to administrator',
			method: req.method,
			hostname: req.hostname,
			originalUrl: req.originalUrl,
			baseUrl: req.baseUrl,
			path: req.path,
		});
	}
};

const loginUser = async (req = request, res = response) => {
	const { email, password } = req.body;

	try {
		let user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({
				ok: false,
				msg: 'Wrong username or password',
				method: req.method,
				hostname: req.hostname,
				originalUrl: req.originalUrl,
				baseUrl: req.baseUrl,
				path: req.path,
			});
		}

		const validPassword = bcrypt.compareSync(password, user.password);

		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Wrong username or password',
				method: req.method,
				hostname: req.hostname,
				originalUrl: req.originalUrl,
				baseUrl: req.baseUrl,
				path: req.path,
			});
		}

		const token = await generateJWT(user.id, user.name);

		return res.status(200).json({
			ok: true,
			msg: 'User successfully login',
			method: req.method,
			hostname: req.hostname,
			originalUrl: req.originalUrl,
			baseUrl: req.baseUrl,
			path: req.path,
			user: {
				uid: user.id,
				name: user.name,
				token,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Internal error, talk to administrator',
			method: req.method,
			hostname: req.hostname,
			originalUrl: req.originalUrl,
			baseUrl: req.baseUrl,
			path: req.path,
		});
	}
};

const renewToken = async (req = request, res = response) => {
	const { uid, name } = req;

	const token = await generateJWT(uid, name);

	return res.json({
		ok: true,
		msg: 'Successfully generated token',
		method: req.method,
		hostname: req.hostname,
		originalUrl: req.originalUrl,
		baseUrl: req.baseUrl,
		path: req.path,
		user: {
			uid,
			name,
			token,
		},
	});
};

module.exports = {
	postUser,
	loginUser,
	renewToken,
};
