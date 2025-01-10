const express = require('express');
const router = express.Router();
const {
    getAllDevoteeCarousel,
    getDevoteeCarouselById,
    addDevoteeCarousel,
    editDevoteeCarousel,
    deleteDevoteeCarousel,
} = require('../controllers/devoteeCarouselController');

// Fetch all data
router.get('/', getAllDevoteeCarousel);

// Fetch a particular data
router.get('/:id', getDevoteeCarouselById);

// Add data
router.post('/', addDevoteeCarousel);

// Edit data
router.put('/:id', editDevoteeCarousel);

// Delete data
router.delete('/:id', deleteDevoteeCarousel);

module.exports = router;
