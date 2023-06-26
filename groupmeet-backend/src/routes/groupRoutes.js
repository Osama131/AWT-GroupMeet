const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

// Routes for groups
router.post('/create', groupController.createGroup);
router.get('/:groupId', groupController.getGroup);
router.put('/:groupId', groupController.updateGroup);
router.delete('/:groupId', groupController.deleteGroup);

module.exports = router;