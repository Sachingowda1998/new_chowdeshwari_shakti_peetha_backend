const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const ritualController = require('../controllers/ritualController');

// Ritual routes
router.get('/', ritualController.getAllRituals);
router.get('/:id', ritualController.getRitualById);
router.post('/', upload.single('image'), ritualController.addRitual);
router.put('/:id', upload.single('image'), ritualController.editRitual);
router.delete('/:id', ritualController.deleteRitual);

// Options routes
router.get('/:id/options', ritualController.getAllOptions);
router.get('/:ritualId/options/:optionId', ritualController.getOptionById);
router.post('/:id/options', ritualController.addOption);
router.put('/:ritualId/options/:optionId', ritualController.editOption);
router.delete('/:ritualId/options/:optionId', ritualController.deleteOption);

module.exports = router;
