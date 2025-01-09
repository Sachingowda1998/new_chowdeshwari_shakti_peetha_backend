const Product = require('../models/productModel');

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

        if (req.file) updates.image = `/uploads/${req.file.filename}`;

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
        if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Invalid product ID' });
    }
};
