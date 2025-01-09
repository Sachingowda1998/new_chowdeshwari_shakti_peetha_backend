const express = require('express');
const router = express.Router();
const {
    getWebsiteDetails,
    addWebsiteDetails,
    editWebsiteDetails,
    deleteWebsiteDetails,
} = require('../controllers/websiteDetailsController');

// Routes
router.get('/', getWebsiteDetails);
router.post('/', addWebsiteDetails);
router.put('/', editWebsiteDetails);
router.delete('/', deleteWebsiteDetails);

module.exports = router;
