const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/auth');

// Create new transaction
router.post('/', auth, transactionController.createTransaction);

// Get user's transactions
router.get('/', auth, transactionController.getTransactions);

// Get transaction by ID
router.get('/:id', auth, transactionController.getTransactionById);

// Cancel transaction
router.post('/:id/cancel', auth, transactionController.cancelTransaction);

module.exports = router; 