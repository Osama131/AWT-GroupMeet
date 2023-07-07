const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  start: {
    type: String,
    required: true
  },
  end: {
    type: String,
    required: true
  },
  // creator: {
  //   type: String
  // },
  // group: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Group'
  //   }
  // ],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
