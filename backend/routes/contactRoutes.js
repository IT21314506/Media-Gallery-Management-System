const express = require('express');
const {
  submitMessage,
  getMyMessages,
  updateMessage,
  deleteMessage,
  getAllMessages,
  adminDeleteMessage,
} = require('../controllers/contactController');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.post('/', submitMessage);
router.get('/my-messages', authMiddleware(['user', 'admin']), getMyMessages);
router.put('/:id', authMiddleware(['user', 'admin']), updateMessage);
router.delete('/:id', authMiddleware(['user', 'admin']), deleteMessage);
router.get('/admin/contact', authMiddleware(['admin']), getAllMessages);
router.delete('/admin/contact/:id', authMiddleware(['admin']), adminDeleteMessage);

module.exports = router;