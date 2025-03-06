const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Get user profile
router.get('/profile', auth, userController.getProfile);

// Update user profile
router.put('/profile', auth, userController.updateProfile);

// Change PIN
router.post('/change-pin', auth, userController.changePin);

// Get user balance
router.get('/balance', auth, userController.getBalance);

module.exports = router; 