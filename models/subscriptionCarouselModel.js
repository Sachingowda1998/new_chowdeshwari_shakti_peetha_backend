const mongoose = require('mongoose');
const sanitize = require('mongoose-sanitize');

const subscriptionCarouselSchema = new mongoose.Schema({
    dateOfAdd: {
        type: Date,
        default: Date.now,
    },
    headline: {
        type: String,
        required: [true, 'Headline is required'],
    },
    subheadline: {
        type: String,
        required: [true, 'Subheadline is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    eventDateAndTime: {
        type: String,
        required: [true, 'Event date and time are required'],
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
});

subscriptionCarouselSchema.plugin(sanitize);

module.exports = mongoose.model('SubscriptionCarousel', subscriptionCarouselSchema);
