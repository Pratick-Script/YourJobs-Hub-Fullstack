import mongoose from "mongoose";
import dns from "node:dns";

// Fix Windows DNS querySrv ECONNREFUSED with MongoDB Atlas
dns.setServers(["8.8.8.8", "8.8.4.4"]);

//Function to connect to the MongoDb Database

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("Database connected");
    });

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`);
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
    }
}

export default connectDB;