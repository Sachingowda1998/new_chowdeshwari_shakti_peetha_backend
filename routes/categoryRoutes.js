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

router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.get('/:id/subcategories', getSubcategories);
router.get('/:id/subcategories/:subId', getSubcategory);

router.post('/', upload.single('image'), addCategory);
router.post('/:id/subcategories', addSubcategory);

router.put('/:id', editCategory);
router.put('/:id/subcategories/:subId', editSubcategory);

router.delete('/:id', deleteCategory);
router.delete('/:id/subcategories/:subId', deleteSubcategory);

module.exports = router;
