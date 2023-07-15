/*
   Rutas de Eventos
   <host>:<port>/api/events
   example: http://localhost:8080/api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { jwtValidator } = require('../middlewares/jwtValidator');
const { fieldValidators } = require('../middlewares/fieldValidators');
const { isDate } = require('../helpers/isDate');
const {
	deleteEvent,
	getEvents,
	postEvent,
	updateEvent,
} = require('../controllers/events');

const router = Router();

router.use(jwtValidator);

router.get('/', getEvents);

router.post(
	'/',
	[
		check('title', 'Title is required').not().isEmpty(),
		check('start', 'Start date is required').custom(isDate),
		check('end', 'End date is required').custom(isDate),
		fieldValidators,
	],
	postEvent
);

router.put(
	'/:id',
	[
		check('title', 'Title is required').not().isEmpty(),
		check('start', 'Start date is required').custom(isDate),
		check('end', 'End date is required').custom(isDate),
		fieldValidators,
	],
	updateEvent
);

router.delete('/:id', deleteEvent);

module.exports = router;
