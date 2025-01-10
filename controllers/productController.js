const Product = require('../models/productModel');

const fs = require('fs'); // Import the file system module

// Fetch all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products. Please try again.' });
    }
};

// Fetch a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: 'Invalid product ID' });
    }
};

// Add a new product
exports.addProduct = async (req, res) => {
    try {
        const { productName, description, price } = req.body;
        if (!req.file) return res.status(400).json({ error: 'Product image is required' });

        const newProduct = new Product({
            productName,
            image: `/uploads/${req.file.filename}`,
            description,
            price,
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Edit a product
exports.editProduct = async (req, res) => {
    try {
        const { productName, description, price, active } = req.body;
        const updates = { productName, description, price, active };

        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        // If a new image is uploaded, delete the old image
        if (req.file) {
            updates.image = `/uploads/${req.file.filename}`;

            // Delete the old image file
            const oldImagePath = `.${product.image}`; // Relative path to the old image
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath); // Remove the file
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        // Delete the associated image file
        const imagePath = `.${product.image}`; // Relative path to the image
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath); // Remove the file
        }

        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Invalid product ID' });
    }
};

