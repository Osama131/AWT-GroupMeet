const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

// Import middleware
const errorMiddleware = require('./middleware/errorMiddleware');
const authMiddleware = require('./middleware/authMiddleware');

// Import database connection
const connectToDatabase = require('./config/database');
connectToDatabase();

// Import models
const User = require('./models/user');
const Event = require('./models/event');
const Group = require('./models/group');

// Import routes
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const groupRoutes = require('./routes/groupRoutes');
const userRoutes = require('./routes/userRoutes');

// Passport configuration
require('./config/passport')(passport);

// Express body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/groups', groupRoutes);
app.use('/users', userRoutes);

// Custom error middleware
app.use(errorMiddleware);

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});