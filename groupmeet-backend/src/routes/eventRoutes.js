const express = require('express');
var router = express.Router();
const Event = require('../models/Event');

const eventController = require('../controllers/eventController');

// Create a new event
router.post('/', eventController.createEvent);

module.exports = router;
