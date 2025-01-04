const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Login = require('../models/loginModel');

const generateToken = (user) => {
    return jwt.sign(
        { email: user.email, loginType: user.loginType },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }  
    );
};


// Login API
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Login.findOne({ email });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = generateToken(user);
        // res.cookie('userToken', token, { httpOnly: true });
        // res.cookie('loginType', user.loginType, { httpOnly: true });
        res.cookie('userToken', token, { httpOnly: false, secure: false, sameSite: 'None' });
        res.cookie('loginType', user.loginType, { httpOnly: false, secure: false, sameSite: 'None' });
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Add User
exports.addUser = async (req, res) => {
    try {
        const user = new Login(req.body);
        await user.save();
        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        // Handle duplicate userId, email, or mobile number error
        if (error.code === 11000) {
            let field;
            if (error.keyValue.userId) {
                field = 'User ID';
            } else if (error.keyValue.email) {
                field = 'Email';
            } else if (error.keyValue.mobileNumber) {
                field = 'Mobile number';
            }
            return res.status(400).json({ error: `${field} is already taken` });
        }
        const errors = Object.values(error.errors).map(err => err.message);
        res.status(400).json({ error: errors });
    }
};

// Edit User Data
exports.editUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const updatedUser = await Login.findOneAndUpdate({ userId }, req.body, { new: true, runValidators: true });
        if (!updatedUser) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        // Handle duplicate userId, email, or mobile number error
        if (error.code === 11000) {
            let field;
            if (error.keyValue.userId) {
                field = 'User ID';
            } else if (error.keyValue.email) {
                field = 'Email';
            } else if (error.keyValue.mobileNumber) {
                field = 'Mobile number';
            }
            return res.status(400).json({ error: `${field} is already taken` });
        }
        const errors = Object.values(error.errors).map(err => err.message);
        res.status(400).json({ error: errors });
    }
};


// Edit Password
exports.editPassword = async (req, res) => {
    const { userId } = req.params;
    const { password } = req.body;

    try {
        const user = await Login.findOne({ userId });
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.password = await bcrypt.hash(password, 10);
        await user.save();
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Fetch User Data
exports.getUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await Login.findOne({ userId });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const deletedUser = await Login.findOneAndDelete({ userId });
        if (!deletedUser) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
