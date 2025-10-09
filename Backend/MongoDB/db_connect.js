const mongoose = require("mongoose");

const connectDB = async () => {

    try
    {
        //Establishing connection with mongoDB
        const response = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connection is successful.");
    }
    catch(connectionError)
    {
        console.error("Error while connecting to MongoDB");
    }
}

module.exports = connectDB;