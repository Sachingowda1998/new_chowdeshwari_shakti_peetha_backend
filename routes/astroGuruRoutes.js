const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const astroGuruController = require('../controllers/astroGuruController');

// Fetch all data
router.get('/', astroGuruController.getAllData);

// Fetch a single record by ID
router.get('/:id', astroGuruController.getDataById);

// Add new data
router.post('/', upload.single('image'), astroGuruController.addData);

// Edit data
router.put('/:id', upload.single('image'), astroGuruController.editData);

// Delete data
router.delete('/:id', astroGuruController.deleteData);

module.exports = router;
