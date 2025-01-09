const WebsiteDetails = require('../models/websiteDetailsModel');

// Fetch website details
exports.getWebsiteDetails = async (req, res) => {
    try {
        const details = await WebsiteDetails.findOne();
        if (!details) return res.status(404).json({ message: 'Website details not found' });
        res.json(details);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Add website details
exports.addWebsiteDetails = async (req, res) => {
    try {
        const details = new WebsiteDetails(req.body);
        await details.save();
        res.status(201).json({ message: 'Website details added successfully', data: details });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Edit website details
exports.editWebsiteDetails = async (req, res) => {
    try {
        const details = await WebsiteDetails.findOneAndUpdate({}, req.body, {
            new: true,
            runValidators: true,
        });
        if (!details) return res.status(404).json({ message: 'Website details not found' });
        res.json({ message: 'Website details updated successfully', data: details });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete website details
exports.deleteWebsiteDetails = async (req, res) => {
    try {
        const details = await WebsiteDetails.findOneAndDelete();
        if (!details) return res.status(404).json({ message: 'Website details not found' });
        res.json({ message: 'Website details deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
