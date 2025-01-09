const Category = require('../models/categoryModel');

// Fetch all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch a category by ID
exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ error: 'Invalid category ID' });
    }
};

// Fetch all subcategories under a category
exports.getSubcategories = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.status(200).json(category.subcategories);
    } catch (error) {
        res.status(400).json({ error: 'Invalid category ID' });
    }
};

// Fetch a specific subcategory
exports.getSubcategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });

        const subcategory = category.subcategories.id(req.params.subId);
        if (!subcategory) return res.status(404).json({ error: 'Subcategory not found' });

        res.status(200).json(subcategory);
    } catch (error) {
        res.status(400).json({ error: 'Invalid category or subcategory ID' });
    }
};

// Add a category
exports.addCategory = async (req, res) => {
    try {
        const { name, image, active } = req.body;
        if (!name || !image) {
            return res.status(400).json({ error: 'Name and image are required' });
        }

        const category = new Category({ name, image, active });
        await category.save();
        res.status(201).json({ message: 'Category added successfully', category });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add a subcategory under a category
exports.addSubcategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: 'Subcategory name is required' });

        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });

        category.subcategories.push({ name });
        await category.save();
        res.status(201).json({ message: 'Subcategory added successfully', category });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Edit a category
exports.editCategory = async (req, res) => {
    try {
        const { name, image, active } = req.body;
        const category = await Category.findByIdAndUpdate(req.params.id, { name, image, active }, { new: true });
        if (!category) return res.status(404).json({ error: 'Category not found' });

        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Edit a subcategory under a category
exports.editSubcategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: 'Subcategory name is required' });

        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });

        const subcategory = category.subcategories.id(req.params.subId);
        if (!subcategory) return res.status(404).json({ error: 'Subcategory not found' });

        subcategory.name = name;
        await category.save();

        res.status(200).json({ message: 'Subcategory updated successfully', category });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a subcategory under a category
exports.deleteSubcategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });

        const subcategory = category.subcategories.id(req.params.subId);
        if (!subcategory) return res.status(404).json({ error: 'Subcategory not found' });

        subcategory.remove();
        await category.save();

        res.status(200).json({ message: 'Subcategory deleted successfully', category });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
