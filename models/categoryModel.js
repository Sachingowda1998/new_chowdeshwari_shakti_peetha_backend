const mongoose = require('mongoose');
const sanitize = require('mongoose-sanitize');

// Subcategory Schema
const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subcategory name is required'],
        trim: true,
    },
});

// Category Schema
const categorySchema = new mongoose.Schema({
    dateOfAdd: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    active: {
        type: String,
        default: 'yes',
        required: [true, 'Active status is required'],
    },
    subcategories: [subcategorySchema],
});

// Apply Mongoose sanitize plugin
categorySchema.plugin(sanitize);

module.exports = mongoose.model('Category', categorySchema);
