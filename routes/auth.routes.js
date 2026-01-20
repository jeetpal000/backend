import {Router} from "express";
import * as authControllers from "../controllers/authControllers.js"
import { verifyToken } from "../middleware/auth-middleware.js";
const router = Router();

router
    .route("/chat")
    .get(verifyToken, authControllers.getHomePage)

router
    .route("/register")
    .post(authControllers.postRegistration)
router
    .route("/login")
    .post(authControllers.postLogin)

router
    .route("/logout")
    .get(authControllers.logoutUser);
router  
    .route("/updateprofile/:id")
    .post(authControllers.postProfile)

export const authRoutes = router;