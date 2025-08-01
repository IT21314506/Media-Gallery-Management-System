const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/register',register);
router.post('/verify-otp',verifyOTP);
router .post('/login', login);
//router.post('/google-login', googleLogin);
router.post('/google', googleLogin);
router.get('/verify', verifyToken);


module.exports = router;