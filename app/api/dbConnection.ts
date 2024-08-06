import mongoose from "mongoose";

let isConnected = false;

export const  dbConnection=async() => {
    mongoose.set("strictQuery",true)

    if(!process.env.MONGODB_CONNECTION_STRING) return console.log("MONGODB_URL not found")
    if(isConnected) return console.log("Connected to MongoDB");

    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
        isConnected = true
        console.log("Mongoose is connected");
    } catch (e) {
        console.log(e);
        
    }
    
}