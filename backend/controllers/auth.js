import { CustomError, UnauthenticatedError } from "../errors/index.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

const register = async (req, res) => {
  const { name, username, gender, avatar, password } = req.body;
  const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;
  
  try {
    const newUser = await User.create({
      ...req.body,
      avatar: gender === "male" ? boyAvatar : girlAvatar,
    });

    const token = newUser.createJWT();
    res.status(StatusCodes.OK).cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict"
      }).json({
        msg: "user created successfully",
        user: newUser.username,
        token,
      });
  } catch (error) {
    if (error.code === 11000) {
      res.status(500).json({ msg: "username/email already taken", err: error });
    } else {
      res.status(500).json({ msg: "user not created", err: error });
    }
  }
};

const login = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({username})
    if(!user){
      throw new CustomError("no user found")
    }
    const validPassword = await user.comparePassword(password)
    if(!validPassword){
      throw new UnauthenticatedError("invalid credentials")
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({msg: "login successful", token})
  } catch (error) {
    throw new CustomError("something went wrong")
  }
}

const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge: 0}).status(StatusCodes.OK).json({msg: "user logged out successfully"})
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: error})
  }
}

export { register, login, logout };