const AstroGuru = require('../models/astroGuruModel');

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

        if (req.file) updates.image = `/uploads/${req.file.filename}`;

        const updatedData = await AstroGuru.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
        if (!updatedData) return res.status(404).json({ error: 'Data not found' });

        res.status(200).json({ message: 'Data updated successfully', data: updatedData });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete data
exports.deleteData = async (req, res) => {
    try {
        const deletedData = await AstroGuru.findByIdAndDelete(req.params.id);
        if (!deletedData) return res.status(404).json({ error: 'Data not found' });

        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Invalid ID format' });
    }
};
