const User = require('../models/user');

// Controller methods for users
const userController = {
  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Create a new user
      const newUser = new User({
        name,
        email,
        password
      });

      // Save the user to the database
      await newUser.save();

      res.status(200).json({ message: 'User created successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getUser: async (req, res) => {
    try {
      const userId = req.params.userId;

      // Find the user by their ID
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      res.status(200).json({ message: 'User retrieved successfully.', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const updates = req.body;

      // Find the user by their ID and update their fields
      const updatedUser = await User.findByIdAndUpdate(userId, updates, {
        new: true,
        runValidators: true
      });

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found.' });
      }

      res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;

      // Find the user by their ID and delete them
      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found.' });
      }

      res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = userController;
