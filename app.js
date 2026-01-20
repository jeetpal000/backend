import express from "express"
import cors from "cors"
import session from "express-session"
import { connectServer } from "./utils/db.js";
import "dotenv/config"
import { authRoutes } from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";


const app = express();
app.use(cors({
  origin: ["http://localhost:5174", "https://frontend-sigma-fawn-29.vercel.app"],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(session({
  secret: "my_secret",
  resave: true,
  saveUninitialized: false,
}));



app.use(authRoutes);


const PORT = process.env.PORT || 3004
connectServer().then(
  app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`)
  })
);