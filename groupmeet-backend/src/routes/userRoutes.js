const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes for users
router.post('/create', userController.createUser);
router.get('/:userId', userController.getUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;
