var express = require('express');
var router = express.Router();
const Event = require("../models/event");
const {
  getEvents,
  createEvent,
  createPrivateEvent
} = require('../controllers/eventController')

// GET all events
router.get('/:cur_usr', getEvents)

// POST a new event
router.post('/', createEvent)

// POST a new private event
router.post('/private', createPrivateEvent)

// DELETE a group
// router.delete('/:id',deleteGroup)

// DELETE a group member
// router.patch('/delete_member',deleteGroupMember)

// UPDATE a group
// router.patch('/:id', updateGroup)


module.exports = router;