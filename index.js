// Import the express module
const express = require('express')
// Create an instance of the express application
const app = express()

// Load environment variables from a .env file
require('dotenv').config()

// Set the port number from environment variables or default to 4000
const PORT = process.env.PORT || 4000

// Middleware to parse JSON data in incoming requests
app.use(express.json())

// Middleware for handling file uploads using express-fileupload
const fileUpload = require('express-fileupload')
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Connect to the database
const db = require("./config/database")
db.dbConnect();

// Mount API routes from the './routes/FileUpload' module under the '/api/v1' path
const upload = require('./routes/FileUpload')
app.use("/api/v1", upload)

// Connect to a cloud service (e.g., Cloudinary)
const cloudinary = require('./config/cloudinary')
cloudinary.cloudinaryConnect()

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`)
})








