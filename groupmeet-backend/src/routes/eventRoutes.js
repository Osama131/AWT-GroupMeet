const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Routes for events
router.post('/create', eventController.createEvent);
router.get('/:eventId', eventController.getEvent);
router.put('/:eventId', eventController.updateEvent);
router.delete('/:eventId', eventController.deleteEvent);

module.exports = router;
