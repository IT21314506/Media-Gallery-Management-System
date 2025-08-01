const Contact = require('../models/contact');

exports.submitMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({
      name,
      email,
      message,
      userId: req.user?.userId || null,
    });
    await contact.save();
    res.status(201).json({ message: 'Message submitted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMyMessages = async (req, res) => {
  try {
    const messages = await Contact.find({ userId: req.user.userId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Contact.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Contact.findOneAndDelete({ _id: id, userId: req.user.userId });
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.status(200).json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().populate('userId', 'name email');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.adminDeleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Contact.findByIdAndDelete(id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.status(200).json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
