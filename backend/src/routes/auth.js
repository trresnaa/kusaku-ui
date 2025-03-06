const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

// Reset PIN
router.post('/reset-pin', authController.resetPin);

module.exports = router; 