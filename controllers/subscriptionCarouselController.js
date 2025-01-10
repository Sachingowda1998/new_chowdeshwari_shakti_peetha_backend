const SubscriptionCarousel = require('../models/subscriptionCarouselModel');
const fs = require('fs');

// Fetch all data
exports.getAllSubscriptionCarousel = async (req, res) => {
    try {
        const carousels = await SubscriptionCarousel.find();
        res.status(200).json(carousels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch a particular data
exports.getSubscriptionCarouselById = async (req, res) => {
    try {
        const carousel = await SubscriptionCarousel.findById(req.params.id);
        if (!carousel) return res.status(404).json({ error: 'Carousel not found' });
        res.status(200).json(carousel);
    } catch (error) {
        res.status(400).json({ error: 'Invalid ID format' });
    }
};

// Add data
exports.addSubscriptionCarousel = async (req, res) => {
    try {
        const { headline, subheadline, description, eventDateAndTime, address } = req.body;
        if (!req.file) return res.status(400).json({ error: 'Image is required' });

        const newCarousel = await SubscriptionCarousel.create({
            headline,
            subheadline,
            description,
            eventDateAndTime,
            address,
            image: `/uploads/${req.file.filename}`,
        });

        res.status(201).json({ message: 'Carousel added successfully', carousel: newCarousel });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Edit data
exports.editSubscriptionCarousel = async (req, res) => {
    try {
        const { headline, subheadline, description, eventDateAndTime, address } = req.body;
        const updates = { headline, subheadline, description, eventDateAndTime, address };

        const carousel = await SubscriptionCarousel.findById(req.params.id);
        if (!carousel) return res.status(404).json({ error: 'Carousel not found' });

        // If a new image is uploaded, delete the old image and update the image path
        if (req.file) {
            const oldImagePath = `.${carousel.image}`; // Relative path to the old image
            if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);

            updates.image = `/uploads/${req.file.filename}`;
        }

        const updatedCarousel = await SubscriptionCarousel.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true } // Return the updated document and apply validators
        );

        res.status(200).json({ message: 'Carousel updated successfully', carousel: updatedCarousel });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Delete data
exports.deleteSubscriptionCarousel = async (req, res) => {
    try {
        const carousel = await SubscriptionCarousel.findById(req.params.id);
        if (!carousel) return res.status(404).json({ error: 'Carousel not found' });

        // Delete the image file
        const imagePath = `.${carousel.image}`;
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

        await SubscriptionCarousel.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Carousel deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Invalid ID format' });
    }
};
