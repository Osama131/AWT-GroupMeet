const Event = require('../models/event');
const mongoose = require('mongoose')

// get all events
const getEvents = async (req, res) => {
  try {
    // Get event logic here
    res.status(200).json({ message: 'Event retrieved successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
 getEvents
}