const { request, response } = require('express');
const Event = require('../models/Event');

const getEvents = async (req = request, res = response) => {
	const events = await Event.find({}).populate('user', 'name email');
	const countEvents = await Event.countDocuments();
	return res.json({
		ok: true,
		msg: countEvents === 0 ? 'No events to load' : 'Events loaded successfully',
		method: req.method,
		hostname: req.hostname,
		originalUrl: req.originalUrl,
		baseUrl: req.baseUrl,
		path: req.path,
		count: countEvents,
		events,
	});
};

const postEvent = async (req = request, res = response) => {
	const event = new Event(req.body);

	try {
		event.user = req.uid;
		const eventSaved = await event.save();

		return res.status(201).json({
			ok: true,
			msg: 'Event created successfully',
			method: req.method,
			hostname: req.hostname,
			originalUrl: req.originalUrl,
			baseUrl: req.baseUrl,
			path: req.path,
			event: eventSaved,
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

const updateEvent = async (req = request, res = response) => {
	const eventId = req.params.id;

	try {
		const event = await Event.findById(eventId);

		if (!event) {
			return res.status(404).json({
				ok: false,
				msg: 'Event does not exist with that ID',
				method: req.method,
				params: req.params,
				hostname: req.hostname,
				originalUrl: req.originalUrl,
				baseUrl: req.baseUrl,
				path: req.path,
				eventId,
			});
		}

		if (event.user.toString() !== req.uid) {
			return res.status(401).json({
				ok: false,
				msg: 'Unauthorized user, cannot edit this event',
				method: req.method,
				params: req.params,
				hostname: req.hostname,
				originalUrl: req.originalUrl,
				baseUrl: req.baseUrl,
				path: req.path,
			});
		}

		const newEvent = {
			...req.body,
			user: req.uid,
		};

		const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
			new: true,
		});

		return res.status(200).json({
			ok: true,
			msg: 'Event updated successfully',
			method: req.method,
			params: req.params,
			hostname: req.hostname,
			originalUrl: req.originalUrl,
			baseUrl: req.baseUrl,
			path: req.path,
			event: eventUpdated,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Internal error, talk to administrator',
			method: req.method,
			params: req.params,
			hostname: req.hostname,
			originalUrl: req.originalUrl,
			baseUrl: req.baseUrl,
			path: req.path,
		});
	}
};

const deleteEvent = async (req = request, res = response) => {
	const eventId = req.params.id;

	try {
		const event = await Event.findById(eventId);

		if (!event) {
			return res.status(404).json({
				ok: false,
				msg: 'Event does not exist with that ID',
				method: req.method,
				hostname: req.hostname,
				originalUrl: req.originalUrl,
				baseUrl: req.baseUrl,
				path: req.path,
				eventId,
			});
		}

		if (event.user.toString() !== req.uid) {
			return res.status(401).json({
				ok: false,
				msg: 'Unauthorized user, cannot delete this event',
				method: req.method,
				hostname: req.hostname,
				originalUrl: req.originalUrl,
				baseUrl: req.baseUrl,
				path: req.path,
			});
		}

		await Event.findByIdAndDelete(eventId);

		return res.status(200).json({
			ok: true,
			msg: 'Event deleted successfully',
			method: req.method,
			hostname: req.hostname,
			originalUrl: req.originalUrl,
			baseUrl: req.baseUrl,
			path: req.path,
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

module.exports = {
	getEvents,
	postEvent,
	updateEvent,
	deleteEvent,
};
