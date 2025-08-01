const express = require('express');
const { uploadMedia, getMedia, searchMedia, downloadZip } = require('../controllers/mediaController');
const authMiddleware = require('../middlewares/auth');
const { upload } = require('../utils/upload');
const router = express.Router();

router.post('/upload', authMiddleware(['user', 'admin']), upload.single('file'), uploadMedia);
router.get('/', authMiddleware(['user', 'admin']), getMedia);
router.get('/search', authMiddleware(['user', 'admin']), searchMedia);
router.post('/zip', authMiddleware(['user', 'admin']), downloadZip);
router.put('/:id', authMiddleware(['user', 'admin']), upload.single('file'), updateMedia);
router.delete('/:id', authMiddleware(['user', 'admin']), deleteMedia);

module.exports = router;