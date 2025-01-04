const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require("cors");
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Initialize the app
const app = express();

// Middleware
app.use(express.json());

// Enable CORS for all routes 
app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL }));

// Use Helmet for added security headers
app.use(helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "img-src": ["'self'", "data:", process.env.FRONT_END_URL, "http://localhost:3001"], // Allow images from self and front-end origin
      }
    },
    crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow resources to be shared across origins
  }));

app.use(cookieParser());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/loginRoutes'));

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
