const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOTP = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. Valid for 10 minutes.`,
  });
};

module.exports = { generateOTP, sendOTP };