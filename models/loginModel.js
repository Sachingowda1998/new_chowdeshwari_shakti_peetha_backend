const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const mongooseSanitize = require('mongoose-sanitize');

const loginSchema = new mongoose.Schema({
    fullName: { type: String, required: [true, 'Full name is required'] },
    userId: { type: String, required: [true, 'User ID is required'], unique: true },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
        unique: true
    },
    password: { type: String, required: [true, 'Password is required'] },
    mobileNumber: {
        type: String,
        required: [true, 'Mobile number is required'],
        match: [/^\d{10}$/, 'Mobile number must be 10 digits'],
        unique: true
    },
    alternateMobileNumber: { type: String },
    address: { type: String },
    loginType: {
        type: String,
        required: [true, 'Login type is required'],
        enum: ['user', 'admin']
    }
});

// Apply sanitizer
loginSchema.plugin(mongooseSanitize);

// Hash password before saving
loginSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Add method to compare passwords
loginSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Login', loginSchema);
