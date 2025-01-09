const mongoose = require('mongoose');
const sanitize = require('mongoose-sanitize'); // mongoose-sanitize for sanitizing inputs

const carouselSchema = new mongoose.Schema({
    dateOfAdd: {
        type: Date,
        default: Date.now,
    },
    carouselText1: {
        type: String,
        required: [true, 'Carousel text 1 is required'],
    },
    carouselText2: {
        type: String,
        required: [true, 'Carousel text 2 is required'],
    },
    carouselText3: {
        type: String,
        required: [true, 'Carousel text 3 is required'],
    },
    image1: {
        type: String,
        required: [true, 'Image 1 is required'],
    },
    image2: {
        type: String,
        required: [true, 'Image 2 is required'],
    },
    image3: {
        type: String,
        required: [true, 'Image 3 is required'],
    },
});

// Apply mongoose-sanitize plugin to sanitize fields
carouselSchema.plugin(sanitize);

module.exports = mongoose.model('Carousel', carouselSchema);
