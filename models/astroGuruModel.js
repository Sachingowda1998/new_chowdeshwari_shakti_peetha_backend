const mongoose = require('mongoose');

const astroGuruSchema = new mongoose.Schema({
    dateOfAdd: { type: Date, default: Date.now },
    name: { type: String, required: [true, 'Name is required'], trim: true },
    description: { type: String, required: [true, 'Description is required'], trim: true },
    languages: { type: String, required: [true, 'Languages are required'], trim: true },
    price: { type: Number, required: [true, 'Price is required'], min: [0, 'Price must be a positive number'] },
    availableTime: { type: String, required: [true, 'Available time is required'], trim: true },
    image: { type: String, required: [true, 'Image is required'] },
    active: { type: String, required: true, default: 'yes', enum: ['yes', 'no'] },
});

module.exports = mongoose.model('AstroGuru', astroGuruSchema);
