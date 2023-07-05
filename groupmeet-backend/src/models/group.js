const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  members: [
    {
      type: String,
    }
  ],
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
