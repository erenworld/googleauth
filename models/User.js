import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

const { JWT_SECRET, JWT_LIFETIME } = config;

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Please provide a name"],
      minlength: 3,
      maxlength: 56,
    },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email.",
      ],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: false,
    }
});

UserSchema.methods.generateToken = function() {
    const token = jwt.sign({
      id: this._id
    }, JWT_SECRET, {
      expiresIn: JWT_LIFETIME,
    });
    return token;
};

const User = mongoose.model("User", UserSchema);

export default User;
