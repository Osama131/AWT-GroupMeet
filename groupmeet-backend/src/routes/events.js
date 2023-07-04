var express = require('express');
var router = express.Router();
const Event = require("../models/event");
const {
  getEvents
} = require('../controllers/eventController')

// GET all events
router.get('/', getEvents)

// GET a single group
// router.get('/:id', getGroup)

// POST a new workout
// router.post('/', createGroup)

// DELETE a group
// router.delete('/:id',deleteGroup)

// DELETE a group member
// router.patch('/delete_member',deleteGroupMember)

// UPDATE a group
// router.patch('/:id', updateGroup)


module.exports = router;