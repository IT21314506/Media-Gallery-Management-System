const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  fileUrl: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  galleryType: { type: String, enum: ['personal', 'shared'], default: 'personal' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Media', mediaSchema);