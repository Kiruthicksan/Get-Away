import jwt from "jsonwebtoken";
import { StrictMode } from "react";

const generateToken = (res, userId) => {
  // creating token
  const token = jwt.sign({ id: userId }, process.env.SECRETKEY, {
    expiresIn: "7d",
  });

  // set token as httponly cookie

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export default generateToken;
