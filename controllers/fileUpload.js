// Import the Mongoose model for "file"
const File = require('../models/file');

const cloudinary = require('cloudinary').v2;

// Define the controller function for local file upload
exports.localFileUpload = async (req, res) => {
    try {
        // Fetch the uploaded file from the request
        const file = req.files.file;
        console.log(file);

        // Construct the path where the file will be stored, incorporating the current timestamp
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log(path);

        // Move the uploaded file to the specified path on the server.
        // It also handles any errors that may occur during the file transfer.
        file.mv(path, (err) => {
            if (err) {
                // Log any error that occurs during the file transfer
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "File upload failed",
                });
            }
        });

        // Respond with a success message once the file has been successfully uploaded
        res.status(200).json({
            success: true,
            message: "File Uploaded Successfully",
        });

    } catch (error) {
        // Handle any errors that occur during the file upload process
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};







// Function to check if the file type is supported
function isFileTypeSupported(type, supportedTypes) {
   // Check if the provided 'type' is included in the 'supportedTypes' array
   return supportedTypes.includes(type);
}

// Function to upload a file to Cloudinary
async function uploadFileToCloudinary(file, folder,quality) {
   const options = { folder };

   if(quality){
      options.quality = quality;
   }

   options.resource_type = "auto"
   // Upload the file to Cloudinary with the specified options
   return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// ImageUpload handler
exports.imageUpload = async (req, res) => {
   try {
       // Fetch data from the request body
       const { name, tags, email } = req.body;
       console.log(name, tags, email);

       // Fetch the uploaded file from the request
       const file = req.files.imageFile;
       console.log(file);

       // Validation: Check if the file type is supported
       const supportedTypes = ["jpeg", "png", "jpg"];
       const myFileType = file.name.split('.')[1].toLowerCase();

       if (!isFileTypeSupported(myFileType, supportedTypes)) {
           return res.status(500).json({
               success: false,
               message: "File type is not supported"
           });
       }

       // File format is supported

       // Upload the file to Cloudinary with a specified folder
       const response = await uploadFileToCloudinary(file, "MyFolder");
       console.log(response);

       // Make an entry in the database 
       const fileData = await File.create({
          name,
          tags,
          email,
          imageUrl:response.secure_url,
       });

       res.json({
           success: true,
           message: "Image uploaded successfully"
       });
   } catch (error) {
       console.error(error);
       res.status(400).json({
           success: false,
           message: "Something went wrong"
       });
   }
};


// Video upload handler

exports.videoUpload = async (req, res) => {
   try {
       // Fetch data from the request body
       const { name, tags, email } = req.body;
       console.log(name, tags, email);

       // Fetch the uploaded file from the request
       const file = req.files.videoFile;
       console.log(file);

       // Validation: Check if the file type is supported
       const supportedTypes = ["mp4", "mkv", "mov"];
       const myFileType = file.name.split('.')[1].toLowerCase();

       if (!isFileTypeSupported(myFileType, supportedTypes)) {
           return res.status(500).json({
               success: false,
               message: "File type is not supported"
           });
       }

       // File format is supported

       // Upload the file to Cloudinary with a specified folder
       const response = await uploadFileToCloudinary(file, "MyFolder");
       console.log(response);

       // Make an entry in the database 
       const fileData = await File.create({
          name,
          tags,
          email,
          imageUrl:response.secure_url,
       });

       res.json({
           success: true,
           message: "Video uploaded successfully"
       });
   } catch (error) {
       console.error(error);
       res.status(400).json({
           success: false,
           message: "Something went wrong"
       });
   }
};


// image size reduce handler
exports.imageSizeReducer = async (req, res) => {
   try {
        // Fetch data from the request body
        const { name, tags, email } = req.body;
        console.log(name, tags, email);
 
        // Fetch the uploaded file from the request
        const file = req.files.imageFile;
        console.log(file);
 
        // Validation: Check if the file type is supported
        const supportedTypes = ["jpg", "jpeg", "png"];
        const myFileType = file.name.split('.')[1].toLowerCase();
 
        if (!isFileTypeSupported(myFileType, supportedTypes)) {
            return res.status(500).json({
                success: false,
                message: "File type is not supported"
            });
        }
 
        // File format is supported
 
        // Define the image quality (adjust as needed)
        const quality = 10; // Adjust this value based on your requirements
 
        // Upload the file to Cloudinary with a specified folder and quality
        const response = await uploadFileToCloudinary(file, "MyFolder", quality);
        console.log(response);
        // Accessing the original filename from the Cloudinary response
            //  const originalFilename = response.original_filename;
            // console.log(originalFilename);   
 
        // Make an entry in the database 
        const fileData = await File.create({
           name,
           tags,
           email,
           imageUrl: response.secure_url,
        });
 
        res.json({
            success: true,
            message: "Image reduced and uploaded successfully"
        });
   } catch(error){
      console.error(error);
      res.status(400).json({
          success: false,
          message: "Something went wrong"
      });
   }
}
