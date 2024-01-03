const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnect = () => {
    // Connect to MongoDB using Mongoose with the provided URL from environment variables
    mongoose.connect(process.env.MONGODB_URL, {
        // You can uncomment the following options if needed
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => {
        // Log a success message if the connection is established
        console.log("Db connected successfully");
    })
    .catch((error) => {
        // Log an error message if there's an issue with the connection
        console.log("Db connection error");
        console.error(error);

        // Terminate the application if there's a connection error
        process.exit(1);
    });
};

