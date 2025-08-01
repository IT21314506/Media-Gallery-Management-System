const { getUsers, updateUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const express = require('express');


router.get('/users', authMiddleware(['admin']), getUsers);
router.put('/users/:id', authMiddleware(['admin']), updateUser);
router.delete('/users/:id', authMiddleware(['admin']), deleteUser);


module.exports = router;
