const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    dateOfAdd: { type: Date, default: Date.now },
    name: { type: String, required: [true, 'Name is required'], trim: true },
    description: { type: String, required: [true, 'Description is required'], trim: true },
    image: { type: String, required: [true, 'Image is required'] },
    price: { type: Number, required: [true, 'Price is required'], min: [0, 'Price must be a positive number'] },
    active: { type: String, required: true, default: 'yes', enum: ['yes', 'no'] },
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
