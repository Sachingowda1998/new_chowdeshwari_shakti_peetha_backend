const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const productController = require('../controllers/productController');

// Fetch all products
router.get('/', productController.getAllProducts);

// Fetch a single product by ID
router.get('/:id', productController.getProductById);

// Add a new product
router.post('/', upload.single('image'), productController.addProduct);

// Edit a product
router.put('/:id', upload.single('image'), productController.editProduct);

// Delete a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
