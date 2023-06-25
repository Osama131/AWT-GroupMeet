var express = require('express');
var router = express.Router();
const Group = require("../models/groupModel");
const {
  deleteGroup,
  getGroup,
  getGroups,
  updateGroup,
  createGroup
} = require('../controllers/groupsController')

// GET all groups
router.get('/', getGroups)

// GET a single groups
router.get('/:id', getGroup)

// POST a new workout
router.post('/', createGroup)

// DELETE a groups
router.delete('/:id',deleteGroup)

// UPDATE a groups
router.patch('/:id', updateGroup)


module.exports = router;