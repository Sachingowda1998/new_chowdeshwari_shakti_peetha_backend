const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const subscriptionCarouselController = require('../controllers/subscriptionCarouselController');

router.get('/', subscriptionCarouselController.getAllSubscriptionCarousel);
router.get('/:id', subscriptionCarouselController.getSubscriptionCarouselById);
router.post('/', upload.single('image'), subscriptionCarouselController.addSubscriptionCarousel);
router.put('/:id', upload.single('image'), subscriptionCarouselController.editSubscriptionCarousel);
router.delete('/:id', subscriptionCarouselController.deleteSubscriptionCarousel);

module.exports = router;
