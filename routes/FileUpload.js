const express = require('express');
const router = express.Router();

// Importing controller functions for handling different file uploads
const {
    localFileUpload,
    imageUpload,
    videoUpload,
    imageSizeReducer
} = require('../controllers/fileUpload');

// Route for handling local file uploads
router.post("/localFileUpload", localFileUpload);

// Route for handling image uploads
router.post("/imageUpload", imageUpload);

// Route for handling video uploads
router.post("/videoUpload", videoUpload);

// Route for handling image size reduction and uploads
router.post('/imageSizeReducer', imageSizeReducer);

// Exporting the router to be used in the main application
module.exports = router;
