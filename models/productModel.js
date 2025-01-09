const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    dateOfAdd: { type: Date, default: Date.now },
    productName: { type: String, required: [true, 'Product name is required'], trim: true },
    image: { type: String, required: [true, 'Product image is required'] },
    description: { type: String, required: [true, 'Product description is required'], trim: true },
    price: { type: Number, required: [true, 'Product price is required'], min: [0, 'Price must be a positive number'] },
    active: { type: String, required: true, default: 'yes', enum: ['yes', 'no'] },
});

module.exports = mongoose.model('Product', productSchema);
