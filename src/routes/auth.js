/*
   Rutas de Usuarios / Auth
   <host>:<port>/api/auth
   example: http://localhost:8080/api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidators } = require('../middlewares/fieldValidators');
const { jwtValidator } = require('../middlewares/jwtValidator');
const router = Router();

const { postUser, loginUser, renewToken } = require('../controllers/auth');

router.post(
	'/new',
	[
		check('name', 'Name is required').not().isEmpty(),
		check(
			'name',
			'the name must be greater than or equal to 3 characters'
		).isLength({ min: 3 }),
		check('email', 'You must provide an email').isEmail(),
		check('password', 'Password is required').not().isEmpty(),
		check('password', 'Password must be longer than 6 characters').isLength({
			min: 6,
		}),
		fieldValidators,
	],
	postUser
);

router.post(
	'/',
	[
		check('email', 'You must provide an email').isEmail(),
		check('password', 'Password is required').not().isEmpty(),
		check('password', 'Password must be longer than 6 characters').isLength({
			min: 6,
		}),
		fieldValidators,
	],
	loginUser
);

router.get('/renew', jwtValidator, renewToken);

module.exports = router;
