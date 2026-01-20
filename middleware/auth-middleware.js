import jwt from "jsonwebtoken"
import "dotenv/config"

export const verifyToken = (req, res, next)=>{
    const token = req.cookies.accessToken;
    if(!token){
        return res.status(401).json({message: "No token Authorize"})
    }
    try {
        const decode = jwt.verify(token, process.env.MY_SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(403).json({message: "Invalid token"})
    }
}