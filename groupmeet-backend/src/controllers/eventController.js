const Event = require('../models/Event');

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, participants } = req.body;

    // Create the event
    const event = await Event.create({
      title,
      description,
      date,
      participants,
    });

    res.status(201).json({ success: true, event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};


// const Event = require('../models/event');

// // Create a new event

// // Controller methods for events
// const eventController = {
//   createEvent: async (req, res) => {
//     try {
//       const { title, description, group } = req.body;
  
//       // Create the event
//       const event = new Event({
//         title,
//         description,
//         group,
//       });
  
//       // Save the event to the database
//       await event.save();
  
//       res.status(201).json({ message: 'Event created successfully' });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Server Error' });
//     }
//   },

//   getEvent: async (req, res) => {
//     try {
//       // Get event logic here
//       res.status(200).json({ message: 'Event retrieved successfully.' });
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   },

//   updateEvent: async (req, res) => {
//     try {
//       // Update event logic here
//       res.status(200).json({ message: 'Event updated successfully.' });
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   },

//   deleteEvent: async (req, res) => {
//     try {
//       // Delete event logic here
//       res.status(200).json({ message: 'Event deleted successfully.' });
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }
// };

// module.exports = eventController;
