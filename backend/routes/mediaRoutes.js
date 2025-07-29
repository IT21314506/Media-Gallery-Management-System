const express = require('express');

const router = express.Router();

// Controller functions (to be implemented)
const {
    getAllMedia,
    getMediaById,
    createMedia,
    updateMedia,
    deleteMedia
} = require('../controllers/mediaController');

// GET all media
router.get('/', getAllMedia);

// GET a single media item by ID
router.get('/:id', getMediaById);

// POST a new media item
router.post('/', createMedia);

// PUT update a media item by ID
router.put('/:id', updateMedia);

// DELETE a media item by ID
router.delete('/:id', deleteMedia);

module.exports = router;