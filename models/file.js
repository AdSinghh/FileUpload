// Import the Mongoose library
const mongoose = require('mongoose');

// Define the schema for the "file" model
const fileSchema = new mongoose.Schema({
    // Define the "name" field with type String, which is required
    name: {
        type: String,
        required: true,
    },
    // Define the "ImageUrl" field with type String
    ImageUrl: {
        type: String,
    },
    // Define the "tags" field with type String
    tags: {
        type: String,
    },
    // Define the "email" field with type String
    email: {
        type: String,
    }
});


//post middleware

const nodemailer = require('nodemailer');

// This code is a Mongoose middleware that runs after a document is saved to the database
fileSchema.post('save', async function(doc) {
   try {
      console.log(doc); // Log the saved document to the console

      // Create a transporter for sending emails
      let transporter = nodemailer.createTransport({
         host: process.env.MAIL_HOST, // SMTP server host
         auth: {
            user: process.env.MAIL_USER, // SMTP server username
            pass: process.env.MAIL_PASS  // SMTP server password
         }
      });

      // Send an email using the created transporter
      const info = await transporter.sendMail({
         from: "Nodemailer",                       // Sender's name or email address
         to: doc.email,                            // Recipient's email address from the saved document
         subject: "File Uploaded on Cloudinary",  // Subject of the email
         text: "Hello Adarsh",                     // Plain text body of the email
         html: `<p>Bewkuf</p> View Here <a href="${doc.imageUrl}">${doc.imageUrl} </a> </p>` // HTML content of the email
      });

      console.log(info); // Log the information about the sent email

   } catch (error) {
      console.log(error); // Log any errors that occur during the process
   }
});


// Create a Mongoose model named "file" using the defined schema
// The first parameter is the singular name of the collection that will be created in the database
// The second parameter is the schema to be used for documents in the collection
module.exports = mongoose.model("file", fileSchema);
