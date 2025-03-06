const Transaction = require('../models/Transaction');
const User = require('../models/User');

// Create new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { recipientId, amount, type, description } = req.body;
    const senderId = req.user._id;

    // Check if sender has sufficient balance
    const sender = await User.findById(senderId);
    if (sender.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Create transaction
    const transaction = new Transaction({
      sender: senderId,
      recipient: recipientId,
      amount,
      type,
      description
    });

    await transaction.save();

    // Update sender's balance
    sender.balance -= amount;
    await sender.save();

    // Update recipient's balance
    const recipient = await User.findById(recipientId);
    recipient.balance += amount;
    await recipient.save();

    // Update transaction status
    transaction.status = 'completed';
    transaction.completedAt = new Date();
    await transaction.save();

    res.status(201).json({
      message: 'Transaction successful',
      transaction
    });
  } catch (error) {
    res.status(500).json({ message: 'Transaction failed', error: error.message });
  }
};

// Get user's transactions
exports.getTransactions = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const transactions = await Transaction.find({
      $or: [{ sender: userId }, { recipient: userId }]
    })
    .populate('sender', 'name email phone')
    .populate('recipient', 'name email phone')
    .sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transactions', error: error.message });
  }
};

// Get transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('sender', 'name email phone')
      .populate('recipient', 'name email phone');

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transaction', error: error.message });
  }
};

// Cancel transaction
exports.cancelTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.status !== 'pending') {
      return res.status(400).json({ message: 'Transaction cannot be canceled' });
    }

    transaction.status = 'canceled';
    await transaction.save();

    res.json({ message: 'Transaction canceled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel transaction', error: error.message });
  }
}; 