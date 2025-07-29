const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();
const {
    submitMessage,
    getMyMessages,
    updateMessage,
    deleteMessage,
    getAllMessages,
    adminDeleteMessage
} = require('../controllers/contactController');

// POST /api/contact - Submit new message (All users)
router.post('/', submitMessage);

// GET /api/contact/my-messages - Get logged-in user's messages (Authenticated)
router.get('/my-messages', protect, getMyMessages);

// PUT /api/contact/:id - Edit message (Message owner)
router.put('/:id', protect, updateMessage);

// DELETE /api/contact/:id - Delete message (Message owner)
router.delete('/:id', protect, deleteMessage);

// GET /api/admin/contact - Get all messages (Admin only)
router.get('/admin/contact', protect, admin, getAllMessages);

// DELETE /api/admin/contact/:id - Delete any message (Admin only)
router.delete('/admin/contact/:id', protect, admin, adminDeleteMessage);

module.exports = router;