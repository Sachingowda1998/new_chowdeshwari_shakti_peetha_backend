const DevoteeCarousel = require('../models/devoteeCarouselModel');
const fs = require('fs');

// Fetch all data
exports.getAllDevoteeCarousel = async (req, res) => {
    try {
        const carousels = await DevoteeCarousel.find();
        res.status(200).json(carousels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch a particular data
exports.getDevoteeCarouselById = async (req, res) => {
    try {
        const carousel = await DevoteeCarousel.findById(req.params.id);
        if (!carousel) return res.status(404).json({ error: 'Devotee carousel not found' });

        res.status(200).json(carousel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add data
exports.addDevoteeCarousel = async (req, res) => {
    try {
        const { headline, description, name } = req.body;
        if (!headline || !description || !name) {
            return res.status(400).json({ error: 'Headline, description, and name are required' });
        }

        const newCarousel = new DevoteeCarousel({ headline, description, name });
        const savedCarousel = await newCarousel.save();
        res.status(201).json({ message: 'Devotee carousel added successfully', carousel: savedCarousel });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Edit data
exports.editDevoteeCarousel = async (req, res) => {
    try {
        const { headline, description, name } = req.body;

        const updatedCarousel = await DevoteeCarousel.findByIdAndUpdate(
            req.params.id,
            { headline, description, name },
            { new: true, runValidators: true }
        );

        if (!updatedCarousel) return res.status(404).json({ error: 'Devotee carousel not found' });

        res.status(200).json({ message: 'Devotee carousel updated successfully', carousel: updatedCarousel });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete data
exports.deleteDevoteeCarousel = async (req, res) => {
    try {
        const carousel = await DevoteeCarousel.findById(req.params.id);
        if (!carousel) return res.status(404).json({ error: 'Devotee carousel not found' });

        await carousel.remove();
        res.status(200).json({ message: 'Devotee carousel deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
