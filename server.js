const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require("cors");
// const cookieParser = require('cookie-parser');
require('dotenv').config();

// Initialize the app
const app = express();

// Middleware
app.use(express.json());

// Enable CORS for all routes 
app.use(cors());

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

// app.use(cookieParser());

// Serve static files from the uploads folder
app.use('/uploads', express.static('uploads'));


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/loginRoutes'));
app.use('/api/website-details', require('./routes/websiteDetailsRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/astrogurus', require('./routes/astroGuruRoutes'));
app.use('/api/subscriptions', require('./routes/subscriptionRoutes'));
app.use('/api/rituals', require('./routes/ritualRoutes'));
app.use('/api/carousel', require('./routes/carouselRoutes'));
app.use('/api/subscription-carousel', require('./routes/subscriptionCarouselRoutes'));
app.use('/api/devotee-carousel', require('./routes/devoteeCarouselRoutes'));




// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
