import { fileURLToPath } from "url";
import { User } from "../models/Schema.js";
import {
  generateToken,
  hashedPassword,
  verifyPassword,
} from "../services/auth.service.js";
import {
  loginUserValidation,
  registerUserValidation,
} from "../validators/auth-alidation.js";

//*Home page
export const getHomePage = (req, res) => {
      try {
            res.json({message: "Protected route homepage", user: req.user})
      } catch (error) {
            res.status(500).json({message: "server error"})
      }
};

//* Registeration
export const postRegistration = async (req, res) => {
  const { data, error } = registerUserValidation.safeParse(req.body);
  console.log(req.body);

  if (error) {
    const zodMsg = error.issues[0].message;
    return res.status(400).json(zodMsg);
  }
  const { name, email, password } = data;

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(409).json("User already exist");
  }

  const hashPassword = await hashedPassword(password);

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
  });
  console.log("newuser", userExist);
  // const session = await createSession(newUser._id, {
  //       ip: req.clientIp,
  //       userAgent: req.headers["user-agent"],
  // })

  const accessToken = generateToken({
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  });
  console.log(accessToken)
  res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 30*24*60*60*1000
  })
  return res.status(201).json({ message: "register success" });
};

//* Login
export const postLogin = async (req, res) => {
  const { data, error } = loginUserValidation.safeParse(req.body);
  if (error) {
    const zodMsg = error.issues[0].message;
    return res.status(404).json(zodMsg);
  }
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json("User not exist");
  }
  const validPassword = await verifyPassword(password, user.password);
  if (!validPassword) {
    return res.status(404).json("Password is not correct");
  }
  const accessToken = generateToken({
    id: user._id,
    name: user.name,
    email: user.email,
  });
  console.log(accessToken)
  res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30*24*60*60*1000
  })
  console.log(user);

  return res.status(201).json({ message: "login success" });
};

//* logoutUser
export const logoutUser = (req, res)=>{
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });
  return res.status(200).json({message: "Logged out successfully"})
}

//* profileupdate
export const postProfile = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("id", id)
    const { name, image, about } = req.body;

    const updateuser = await User.findByIdAndUpdate(
      id,
      { name, about, image },
      { new: true },
    );
    console.log("updateuser", updateuser);
    return res.json({ message: "update profile", updateuser });
  } catch (error) {
    console.log(error);
    return res.status(400).json("error pata nhi");
  }
};
