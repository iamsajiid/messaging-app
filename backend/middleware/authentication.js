import UnauthenticatedError from "../errors/unauthenticated.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authenticationMiddleware = async (req, res, next) => {
  const token = req.cookies.jwt
  if(!token){
    throw new UnauthenticatedError("unautheticated token")
  }
  const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)  
  try {
    const user = await User.findById(payload.userID).select("-password")
    req.user = user
    next() 
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid")
  }
};

export default authenticationMiddleware;
