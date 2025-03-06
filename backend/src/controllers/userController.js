const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-pin');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (phone) user.phone = phone;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
};

// Change PIN
exports.changePin = async (req, res) => {
  try {
    const { currentPin, newPin } = req.body;
    const user = await User.findById(req.user._id);

    // Verify current PIN
    const isMatch = await user.comparePin(currentPin);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current PIN is incorrect' });
    }

    // Update PIN
    user.pin = newPin;
    await user.save();

    res.json({ message: 'PIN changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to change PIN', error: error.message });
  }
};

// Get user balance
exports.getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch balance', error: error.message });
  }
}; 