const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ isActive: true });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deactivated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};