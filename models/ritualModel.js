const mongoose = require('mongoose');

const optionsSchema = new mongoose.Schema({
    details: { type: String, required: [true, 'Option details are required'], trim: true },
    price: { type: Number, required: [true, 'Option price is required'], min: [0, 'Option price must be a positive number'] },
});

const ritualSchema = new mongoose.Schema({
    dateOfAdd: { type: Date, default: Date.now },
    ritualName: { type: String, required: [true, 'Ritual name is required'], trim: true },
    category: { type: String, required: [true, 'Category is required'], trim: true },
    subcategory: { type: String, required: [true, 'Subcategory is required'], trim: true },
    description: { type: String, required: [true, 'Description is required'], trim: true },
    image: { type: String, required: [true, 'Image is required'] },
    fromPrice: { type: Number, required: [true, 'From price is required'], min: [0, 'From price must be a positive number'] },
    active: { type: String, default: 'yes', enum: ['yes', 'no'] },
    options: [optionsSchema],
});

module.exports = mongoose.model('Ritual', ritualSchema);
