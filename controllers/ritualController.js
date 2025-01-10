const Ritual = require('../models/ritualModel');

const fs = require('fs'); // Add this at the top of your file

// Fetch all rituals
exports.getAllRituals = async (req, res) => {
    try {
        const rituals = await Ritual.find();
        res.status(200).json(rituals);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch rituals. Please try again.' });
    }
};

// Fetch a particular ritual
exports.getRitualById = async (req, res) => {
    try {
        const ritual = await Ritual.findById(req.params.id);
        if (!ritual) return res.status(404).json({ error: 'Ritual not found' });
        res.status(200).json(ritual);
    } catch (error) {
        res.status(400).json({ error: 'Invalid ritual ID format' });
    }
};

// Fetch all options for a particular ritual
exports.getAllOptions = async (req, res) => {
    try {
        const ritual = await Ritual.findById(req.params.id);
        if (!ritual) return res.status(404).json({ error: 'Ritual not found' });
        res.status(200).json(ritual.options);
    } catch (error) {
        res.status(400).json({ error: 'Invalid ritual ID format' });
    }
};

// Fetch a particular option for a ritual
exports.getOptionById = async (req, res) => {
    try {
        const ritual = await Ritual.findById(req.params.ritualId);
        if (!ritual) return res.status(404).json({ error: 'Ritual not found' });

        const option = ritual.options.id(req.params.optionId);
        if (!option) return res.status(404).json({ error: 'Option not found' });

        res.status(200).json(option);
    } catch (error) {
        res.status(400).json({ error: 'Invalid ID format' });
    }
};

// Add a new ritual
exports.addRitual = async (req, res) => {
    try {
        const { ritualName, category, subcategory, description, fromPrice } = req.body;
        if (!req.file) return res.status(400).json({ error: 'Image is required' });

        const newRitual = new Ritual({
            ritualName,
            category,
            subcategory,
            description,
            image: `/uploads/${req.file.filename}`,
            fromPrice,
        });

        await newRitual.save();
        res.status(201).json({ message: 'Ritual added successfully', ritual: newRitual });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add options for a particular ritual
exports.addOption = async (req, res) => {
    try {
        const ritual = await Ritual.findById(req.params.id);
        if (!ritual) return res.status(404).json({ error: 'Ritual not found' });

        const { details, price } = req.body;
        ritual.options.push({ details, price });

        await ritual.save();
        res.status(201).json({ message: 'Option added successfully', ritual });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Edit a ritual
exports.editRitual = async (req, res) => {
    try {
        const ritual = await Ritual.findById(req.params.id);
        if (!ritual) return res.status(404).json({ error: 'Ritual not found' });

        const updates = { ...req.body };

        // If a new file is uploaded, delete the old file
        if (req.file) {
            const oldImagePath = `.${ritual.image}`; // Current image path
            updates.image = `/uploads/${req.file.filename}`; // Update to new image

            // Remove the old image file
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        const updatedRitual = await Ritual.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: 'Ritual updated successfully', ritual: updatedRitual });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Edit options for a particular ritual
exports.editOption = async (req, res) => {
    try {
        const ritual = await Ritual.findById(req.params.ritualId);
        if (!ritual) return res.status(404).json({ error: 'Ritual not found' });

        const option = ritual.options.id(req.params.optionId);
        if (!option) return res.status(404).json({ error: 'Option not found' });

        option.set(req.body);
        await ritual.save();

        res.status(200).json({ message: 'Option updated successfully', ritual });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a ritual
exports.deleteRitual = async (req, res) => {
    try {
        const ritual = await Ritual.findById(req.params.id);
        if (!ritual) return res.status(404).json({ error: 'Ritual not found' });

        // Remove the image file
        const imagePath = `.${ritual.image}`;
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        // Delete the ritual
        await ritual.remove();

        res.status(200).json({ message: 'Ritual deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Invalid ritual ID format' });
    }
};


// Delete an option for a ritual
exports.deleteOption = async (req, res) => {
    try {
        const ritual = await Ritual.findById(req.params.ritualId);
        if (!ritual) return res.status(404).json({ error: 'Ritual not found' });

        const option = ritual.options.id(req.params.optionId);
        if (!option) return res.status(404).json({ error: 'Option not found' });

        option.remove();
        await ritual.save();

        res.status(200).json({ message: 'Option deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Invalid ID format' });
    }
};
