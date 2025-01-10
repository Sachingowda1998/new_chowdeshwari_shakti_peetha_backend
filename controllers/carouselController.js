const Carousel = require('../models/carouselModel');

const fs = require('fs'); // Import the file system module

// Fetch carousel data
exports.getCarouselData = async (req, res) => {
    try {
        const data = await Carousel.findOne();
        if (!data) return res.status(404).json({ error: 'Carousel data not found' });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Add carousel data
exports.addCarouselData = async (req, res) => {
    try {
        const existingData = await Carousel.findOne();
        if (existingData) return res.status(400).json({ error: 'Carousel data already exists. Use edit instead.' });

        const { carouselText1, carouselText2, carouselText3, image1, image2, image3 } = req.body;
        if (!carouselText1 || !carouselText2 || !carouselText3 || !image1 || !image2 || !image3) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const newData = new Carousel({ carouselText1, carouselText2, carouselText3, image1, image2, image3 });
        await newData.save();
        res.status(201).json({ message: 'Carousel data added successfully', data: newData });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Edit carousel data
exports.editCarouselData = async (req, res) => {
    try {
        const updates = req.body;

        const existingData = await Carousel.findOne();

        if (!existingData) return res.status(404).json({ error: 'Carousel data not found' });

        // Delete old images if new ones are uploaded
        if (req.files) {
            const oldImages = [existingData.image1, existingData.image2, existingData.image3];
            const newImages = [updates.image1, updates.image2, updates.image3];
            oldImages.forEach((image, index) => {
                if (image && image !== newImages[index]) {
                    const filePath = `.${image}`;
                    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
                }
            });
        }
        const data = await Carousel.findOneAndUpdate({}, updates, { new: true, runValidators: true });

        res.status(200).json({ message: 'Carousel data updated successfully', data });

    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete carousel data
exports.deleteCarouselData = async (req, res) => {
    try {
        const data = await Carousel.findOneAndDelete();
        if (!data) return res.status(404).json({ error: 'Carousel data not found' });

        // Remove associated images
        const imagesToDelete = [data.image1, data.image2, data.image3];
        imagesToDelete.forEach((image) => {
            if (image) {
                const filePath = `.${image}`;
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
        });

        res.status(200).json({ message: 'Carousel data deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

