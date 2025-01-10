const Subscription = require('../models/subscriptionModel');

// Import fs for file system operations
const fs = require('fs');

// Fetch all subscriptions
exports.getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch subscriptions. Please try again.' });
    }
};

// Fetch a single subscription by ID
exports.getSubscriptionById = async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) return res.status(404).json({ error: 'Subscription not found' });
        res.status(200).json(subscription);
    } catch (error) {
        res.status(400).json({ error: 'Invalid ID format' });
    }
};

// Add a new subscription
exports.addSubscription = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        if (!req.file) return res.status(400).json({ error: 'Image is required' });

        const newSubscription = new Subscription({
            name,
            description,
            image: `/uploads/${req.file.filename}`,
            price,
        });

        await newSubscription.save();
        res.status(201).json({ message: 'Subscription added successfully', data: newSubscription });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Edit a subscription
exports.editSubscription = async (req, res) => {
    try {
        const { name, description, price, active } = req.body;
        const updates = { name, description, price, active };

        if (req.file) {
            // Get the current image path of the subscription
            const subscription = await Subscription.findById(req.params.id);
            const oldImagePath = `.${subscription.image}`; // Current image path

            // Update the image with the new file path
            updates.image = `/uploads/${req.file.filename}`;

            // Remove the old image file
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        const updatedSubscription = await Subscription.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedSubscription) return res.status(404).json({ error: 'Subscription not found' });

        res.status(200).json({ message: 'Subscription updated successfully', data: updatedSubscription });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Delete a subscription
exports.deleteSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) return res.status(404).json({ error: 'Subscription not found' });

        // Get the current image path of the subscription
        const imagePath = `.${subscription.image}`;

        // Delete the subscription from the database
        await Subscription.findByIdAndDelete(req.params.id);

        // Remove the image file if it exists
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        res.status(200).json({ message: 'Subscription deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Invalid ID format' });
    }
};


