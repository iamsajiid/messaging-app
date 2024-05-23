import UnauthenticatedError from "../errors/unauthenticated.js";
import jwt from "jsonwebtoken";

const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!payload) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  try {
    req.user = { ...payload };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export default authenticationMiddleware;
