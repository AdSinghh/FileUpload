// Import the Cloudinary module (version 2)
const cloudinary = require('cloudinary').v2;

// Load environment variables from a .env file
require('dotenv').config;

// Export a function named cloudinaryConnect
exports.cloudinaryConnect = () => {
    try {
        // Configure Cloudinary with the provided API credentials from environment variables
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
    } catch (error) {
        // Log any errors that occur during the configuration process
        console.log(error);
    }
};
