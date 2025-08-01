const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype && file.size <= 5 * 1024 * 1024) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type or size'), false);
    }
  },
});

const uploadToCloudinary = async (file) => {
  const result = await cloudinary.uploader.upload(file.path);
  return result.secure_url;
};

module.exports = { upload, uploadToCloudinary };