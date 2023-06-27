var express = require('express');
var router = express.Router();
const Group = require("../models/group");
const {
  deleteGroup,
  getGroup,
  getGroups,
  updateGroup,
  createGroup
} = require('../controllers/groupController')

// GET all groups
router.get('/', getGroups)

// GET a single group
router.get('/:id', getGroup)

// POST a new workout
router.post('/', createGroup)

// DELETE a group
router.delete('/:id',deleteGroup)

// UPDATE a group
router.patch('/:id', updateGroup)


module.exports = router;