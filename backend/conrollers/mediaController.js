const Media = require('../models/media');
const { uploadToCloudinary } = require('../utils/upload');
const archiver = require('archiver');
const fs = require('fs');

exports.uploadMedia = async (req, res) => {
  try {
    const { title, description, tags, galleryType } = req.body;
    const fileUrl = await uploadToCloudinary(req.file);
    const media = new Media({
      title,
      description,
      tags: tags.split(','),
      fileUrl,
      userId: req.user.userId,
      galleryType,
    });
    await media.save();
    res.status(201).json(media);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// backend/controllers/mediaController.js
exports.getMedia = async (req, res) => {
  try {
    const { galleryType, query } = req.query;
    const searchQuery = query
      ? {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { tags: { $regex: query, $options: 'i' } },
          ],
          userId: req.user.userId,
        }
      : { userId: req.user.userId };
    if (galleryType) searchQuery.galleryType = galleryType;
    const media = await Media.find(searchQuery);
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.searchMedia = async (req, res) => {
  try {
    const { query } = req.query;
    const media = await Media.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } },
      ],
      userId: req.user.userId,
    });
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.downloadZip = async (req, res) => {
  try {
    const { mediaIds } = req.body;
    const media = await Media.find({ _id: { $in: mediaIds }, userId: req.user.userId });
    const archive = archiver('zip');
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=media.zip');
    archive.pipe(res);
    media.forEach(item => {
      archive.append(request(item.fileUrl), { name: `${item.title}.jpg` });
    });
    archive.finalize();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// backend/controllers/mediaController.js
exports.updateMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tags, galleryType } = req.body;
    let updateData = { title, description, tags: tags.split(','), galleryType };
    
    if (req.file) {
      const fileUrl = await uploadToCloudinary(req.file);
      updateData.fileUrl = fileUrl;
    }

    const media = await Media.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      updateData,
      { new: true }
    );
    if (!media) return res.status(404).json({ message: 'Media not found' });
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.findOneAndDelete({ _id: id, userId: req.user.userId });
    if (!media) return res.status(404).json({ message: 'Media not found' });
    res.status(200).json({ message: 'Media deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};