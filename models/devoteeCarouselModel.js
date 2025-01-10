const mongoose = require('mongoose');
const sanitize = require('mongoose-sanitize');

const DevoteeCarouselSchema = new mongoose.Schema({
    dateOfAdd: { type: Date, default: Date.now },
    headline: { type: String, required: [true, 'Headline is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    name: { type: String, required: [true, 'Name is required'] },
});

DevoteeCarouselSchema.plugin(sanitize);

module.exports = mongoose.model('DevoteeCarousel', DevoteeCarouselSchema);
