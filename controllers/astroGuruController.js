const AstroGuru = require('../models/astroGuruModel');

const fs = require('fs'); // Import the file system module

// Fetch all data
exports.getAllData = async (req, res) => {
    try {
        const data = await AstroGuru.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data. Please try again.' });
    }
};

// Fetch a single record by ID
exports.getDataById = async (req, res) => {
    try {
        const data = await AstroGuru.findById(req.params.id);
        if (!data) return res.status(404).json({ error: 'Data not found' });
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: 'Invalid ID format' });
    }
};

// Add new data
exports.addData = async (req, res) => {
    try {
        const { name, description, languages, price, availableTime } = req.body;
        if (!req.file) return res.status(400).json({ error: 'Image is required' });

        const newData = new AstroGuru({
            name,
            description,
            languages,
            price,
            availableTime,
            image: `/uploads/${req.file.filename}`,
        });

        await newData.save();
        res.status(201).json({ message: 'Data added successfully', data: newData });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Edit data
exports.editData = async (req, res) => {
    try {
        const { name, description, languages, price, availableTime, active } = req.body;
        const updates = { name, description, languages, price, availableTime, active };

        // Find the existing record to get the old image
        const existingData = await AstroGuru.findById(req.params.id);
        if (!existingData) return res.status(404).json({ error: 'Data not found' });

        // Check if a new file is uploaded
        if (req.file) {
            updates.image = `/uploads/${req.file.filename}`;

            // Delete the old image file
            const oldImagePath = `.${existingData.image}`; // Relative path
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath); // Remove the file
            }
        }

        const updatedData = await AstroGuru.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });

        res.status(200).json({ message: 'Data updated successfully', data: updatedData });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteData = async (req, res) => {
    try {
        const dataToDelete = await AstroGuru.findById(req.params.id);
        if (!dataToDelete) return res.status(404).json({ error: 'Data not found' });

        // Delete the associated image file
        const imagePath = `.${dataToDelete.image}`; // Relative path
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath); // Remove the file
        }

        await AstroGuru.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Invalid ID format' });
    }
};

