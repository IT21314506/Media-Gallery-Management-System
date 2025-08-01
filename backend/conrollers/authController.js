const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateOTP, sendOTP } = require('../utils/otp');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User exists' });

    const otp = generateOTP();
    await sendOTP(email, otp);
    res.status(200).json({ message: 'OTP sent', otp }); // OTP returned for testing
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp, name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, email, sub: googleId } = ticket.getPayload();
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, googleId, role: 'user' });
      await user.save();
    }
    const jwtToken = jwt.sign({ userId: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET);
    res.status(200).json({ token: jwtToken });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyToken = async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('name role');
    if (!user) return res.status(401).json({ message: 'User not found' });

    res.status(200).json({ userId: user._id, name: user.name, role: user.role });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  register: exports.register,
  verifyOTP: exports.verifyOTP,
  login: exports.login,
  googleLogin: exports.googleLogin,
  verifyToken: exports.verifyToken,
};