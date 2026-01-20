import mongoose from "mongoose";

import 'dotenv/config'

const URI = process.env.MONGODB_URI;
// console.log(URI)

export const connectServer = async()=>{
    try {
        await mongoose.connect(URI);
        console.log("Server Connected successfuly")
    } catch (error) {
        console.log("Server Connection failed")
        process.exit(1);
    }
}