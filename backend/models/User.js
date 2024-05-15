import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    maxlength: [12, "cannot exceed 12 characters"],
    required: [true, "username is required"],
  },
  gender: {
    type: String,
    Enumerator: ["male", "female"],
    required: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "enter the required email address",
    },
  },
  password: {
    type: String,
    required: [true, "password is required"],
    validate: {
      validator: function (value) {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value);
      },
      message: "password must contain atleast 1 alphabet and 1 digit",
    },
  },
});

userSchema.pre("save", async function(next){
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userID: this._id, username: this.username, avatar: this.avatar },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRATION }
  );
};

userSchema.methods.comparePassword = async function (inputPassword) {
  const isMatch = await bcrypt.compare(inputPassword, this.password)
  return isMatch
}

const User = mongoose.model("User", userSchema);
export default User;