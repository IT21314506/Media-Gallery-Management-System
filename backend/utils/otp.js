const crypto = require('crypto');

/**
 * Utility functions for generating and verifying OTPs
 */


/**
 * Generates a numeric OTP of given length.
 * @param {number} length - Length of the OTP.
 * @returns {string} - Generated OTP.
 */
function generateOTP(length = 6) {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
}

/**
 * Hashes the OTP using SHA256 for secure storage/verification.
 * @param {string} otp - The OTP to hash.
 * @returns {string} - The hashed OTP.
 */
function hashOTP(otp) {
    return crypto.createHash('sha256').update(otp).digest('hex');
}

/**
 * Verifies if a given OTP matches the hashed OTP.
 * @param {string} otp - The plain OTP.
 * @param {string} hashedOTP - The hashed OTP.
 * @returns {boolean}
 */
function verifyOTP(otp, hashedOTP) {
    return hashOTP(otp) === hashedOTP;
}

module.exports = {
    generateOTP,
    hashOTP,
    verifyOTP,
};