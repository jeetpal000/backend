import  mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type:String,
    },
    about:{
        type: String,
    },
    image: {
        type: String,
    }
}, {timestamps: true})

export const User = new mongoose.model("User", userSchema);