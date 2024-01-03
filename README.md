
# File Upload and Management System #

This project is a File Upload and Management System built using Node.js, Express.js, MongoDB, Cloudinary, and Nodemailer. 
It allows users to upload various types of files, including images and videos, which are then stored in the cloud and the database. 
Additionally, the system sends email notifications using Nodemailer when a file is successfully uploaded.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Environment Variables](#environment-variables)
5. [Configuration](#configuration)
6. [Usage](#usage)
7. [API Endpoints](#api-endpoints)
8. [File Types](#file-types)
9. [Email Notifications](#email-notifications)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm
- MongoDB
- Cloudinary account (for file storage)
- Gmail account (for email notifications)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/file-upload-system.git
   cd file-upload-system


2. **Install dependencies**
   ```bash
   npm install

3.**Create a .env file in the project root and add your environment variables.**
<br><br>
4. **Start the application:**
npm run dev
The application will be running at http://localhost:3000 by default.
<br><br>

## Project Structure

The project follows a modular structure:

- **controllers**: Contains functions handling file upload and related operations.

- **config**: Configuration files, e.g., for connecting to the database and Cloudinary.

- **models**: Mongoose models for MongoDB.

- **routes**: Express routes for different file upload scenarios.

- **files**: Temporary storage for uploaded files (can be changed in app.js).

- **views**: Frontend templates (if applicable).

- **app.js**: Main entry point of the application.


# Environment Variables

Create a .env file in the project root and add the following variables:

- PORT=3000
- MONGODB_URL=mongodb://localhost:27017/file_upload_db
- CLOUD_NAME=your_cloudinary_cloud_name
- API_KEY=your_cloudinary_api_key
- API_SECRET=your_cloudinary_api_secret
- MAIL_HOST=smtp.gmail.com
- MAIL_USER=your_gmail@gmail.com
- MAIL_PASS=your_gmail_password
<br><br>

Update the values according to your configuration.
<br><br>

# Configuration

Database Configuration (config/database.js):
Update the Mongoose connection options if needed.

Cloudinary Configuration (config/cloudinary.js):
Update the Cloudinary API credentials.
<br><br>

# Usage


Visit http://localhost:3000 in your browser to access the application.
Use the provided API endpoints for different file upload scenarios.
Check your Gmail inbox for email notifications after successful file uploads.
<br><br>
API Endpoints
<br><br>
1.Local File Upload:
POST /api/v1/localFileUpload

2.Image Upload:
POST /api/v1/imageUpload

3.Video Upload:
POST /api/v1/videoUpload

4.Image Size Reduction and Upload:
POST /api/v1/imageSizeReducer


Refer to the corresponding controller functions for additional details.
<br><br>
# File Types


Supported Image Types:
JPEG, PNG, JPG

Supported Video Types:
MP4, MKV, MOV

Supported for Size Reduction:
JPEG, PNG
<br><br>
**Email Notifications**

The system sends email notifications using Nodemailer when a file is successfully uploaded. Check your Gmail account for these notifications.
