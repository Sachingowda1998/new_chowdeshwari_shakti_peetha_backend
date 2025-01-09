const express = require('express');
const router = express.Router();
const carouselController = require('../controllers/carouselController');

// Routes for carousel
router.get('/', carouselController.getCarouselData);
router.post('/', carouselController.addCarouselData);
router.put('/', carouselController.editCarouselData);
router.delete('/', carouselController.deleteCarouselData);

module.exports = router;
