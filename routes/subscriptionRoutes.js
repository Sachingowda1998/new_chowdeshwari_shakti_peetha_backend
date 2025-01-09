const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const subscriptionController = require('../controllers/subscriptionController');

// Fetch all subscriptions
router.get('/', subscriptionController.getAllSubscriptions);

// Fetch a single subscription by ID
router.get('/:id', subscriptionController.getSubscriptionById);

// Add a new subscription
router.post('/', upload.single('image'), subscriptionController.addSubscription);

// Edit a subscription
router.put('/:id', upload.single('image'), subscriptionController.editSubscription);

// Delete a subscription
router.delete('/:id', subscriptionController.deleteSubscription);

module.exports = router;
