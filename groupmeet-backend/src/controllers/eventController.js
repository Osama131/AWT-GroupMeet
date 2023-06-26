const Event = require('../models/event');

// Controller methods for events
const eventController = {
  createEvent: async (req, res) => {
    try {
      const { title, date, description } = req.body;

      // Create a new event
      const newEvent = new Event({
        title,
        date,
        description,
        attendees,
        creator
      });

      // Save the event to the database
      await newEvent.save();

      res.status(200).json({ message: 'Event created successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getEvent: async (req, res) => {
    try {
      const eventId = req.params.eventId;

      // Find the event by its ID
      const event = await Event.findById(eventId);

      if (!event) {
        return res.status(404).json({ error: 'Event not found.' });
      }

      res.status(200).json({ message: 'Event retrieved successfully.', event });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateEvent: async (req, res) => {
    try {
      const eventId = req.params.eventId;
      const updates = req.body;

      // Find the event by its ID and update its fields
      const updatedEvent = await Event.findByIdAndUpdate(eventId, updates, {
        new: true,
        runValidators: true
      });

      if (!updatedEvent) {
        return res.status(404).json({ error: 'Event not found.' });
      }

      res.status(200).json({ message: 'Event updated successfully.', event: updatedEvent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteEvent: async (req, res) => {
    try {
      const eventId = req.params.eventId;

      // Find the event by its ID and delete it
      const deletedEvent = await Event.findByIdAndDelete(eventId);

      if (!deletedEvent) {
        return res.status(404).json({ error: 'Event not found.' });
      }

      res.status(200).json({ message: 'Event deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = eventController;

