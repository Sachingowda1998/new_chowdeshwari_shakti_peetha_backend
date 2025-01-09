const mongoose = require('mongoose');
const mongooseSanitize = require('mongoose-sanitize');

// Define the schema
const websiteDetailsSchema = new mongoose.Schema({
    dateOfAdd: { type: Date, default: Date.now },
    name: { type: String, required: [true, 'Name is required'] },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: function (email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: 'Invalid email format',
        },
    },
    mobileNumber: {
        type: String,
        required: [true, 'Mobile number is required'],
        validate: {
            validator: function (number) {
                return /^\d{10}$/.test(number);
            },
            message: 'Mobile number must be 10 digits',
        },
    },
    alternateMobileNumber: {
        type: String,
        validate: {
            validator: function (number) {
                return !number || /^\d{10}$/.test(number);
            },
            message: 'Alternate mobile number must be 10 digits',
        },
    },
    address: { type: String, required: [true, 'Address is required'] },
});

// Apply mongoose-sanitize
websiteDetailsSchema.plugin(mongooseSanitize);

// Export model
module.exports = mongoose.model('WebsiteDetails', websiteDetailsSchema);
