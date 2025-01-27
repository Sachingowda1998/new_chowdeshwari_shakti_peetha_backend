const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const {
    getAllCategories,
    getCategory,
    getSubcategories,
    getSubcategory,
    addCategory,
    addSubcategory,
    editCategory,
    editSubcategory,
    deleteCategory,
    deleteSubcategory,
} = require('../controllers/categoryController');

// Routes
router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.get('/:id/subcategories', getSubcategories);
router.get('/:id/subcategories/:subId', getSubcategory);

// Add a category with image upload
router.post('/', upload.single('image'), addCategory);

// Add a subcategory under a category
router.post('/:id/subcategories', addSubcategory);

// Edit a category with image upload
router.put('/:id', upload.single('image'), editCategory);

// Edit a subcategory under a category
router.put('/:id/subcategories/:subId', editSubcategory);

router.delete('/:id', deleteCategory);
router.delete('/:id/subcategories/:subId', deleteSubcategory);

module.exports = router;
