const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');

// @desc    Get signed signature for Cloudinary upload
// @route   GET /api/upload/signature
router.get('/signature', (req, res) => {
    const timestamp = Math.round((new Date()).getTime() / 1000);
    
    // Generate the signature using your backend secret key
    const signature = cloudinary.utils.api_sign_request(
        {
            timestamp: timestamp,
            folder: 'blog_covers' // Images will save in this Cloudinary folder
        },
        process.env.CLOUDINARY_API_SECRET
    );

    res.status(200).json({
        signature,
        timestamp,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY
    });
});

module.exports = router;