import argon from "argon2"
import jwt from "jsonwebtoken"
import "dotenv/config"

import crypto from "crypto";



//* Hashed Password 
export const hashedPassword = async(password)=>{
    return await argon.hash(password)
}

//* Verify hashPassword
export const verifyPassword = async(password, hashPassword)=>{
    return await argon.verify(hashPassword, password);
}
//* Generate session token

export const generateToken = ({name, email, id})=>{
    return jwt.sign({name, email, id}, process.env.MY_SECRET_KEY, {
        expiresIn: "30d"
    })
};
//