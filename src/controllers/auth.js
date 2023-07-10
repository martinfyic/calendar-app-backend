const { request, response } = require('express');

const postUser = (req = request, res = response) => {
	res.json({ ok: true, msg: 'register' });
};

const loginUser = (req = request, res = response) => {
	res.json({ ok: true, msg: 'login' });
};

const renewToken = (req = request, res = response) => {
	res.json({ ok: true, msg: 'renew' });
};

module.exports = {
	postUser,
	loginUser,
	renewToken,
};
