const express = require('express');
const router = express.Router();
const carouselController = require('../controllers/carouselController');
const upload = require('../middlewares/uploadMiddleware');

// Define multer fields for uploading multiple images
const uploadFields = upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
]);

// Routes for carousel
router.get('/', carouselController.getCarouselData);
router.post('/', uploadFields, carouselController.addCarouselData);
router.put('/', uploadFields, carouselController.editCarouselData);
router.delete('/', carouselController.deleteCarouselData);

module.exports = router;
