
import mongoose from "mongoose";

// This function asynchronously establishes a connection to a MongoDB database using Mongoose.

const connectDB = async () => {

    // Attempt to connect to the MongoDB database using the URI from the MONGO_URI environment variable.
    await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('Database connection established');

    }).catch((error)=>{
        // If an error occurs during connection, log a detailed error message for debugging.
        console.log('Error connecting');
    })
};

// Make the connectDB function available for import in other parts of your application.
export default connectDB;