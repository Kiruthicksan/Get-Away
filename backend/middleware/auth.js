import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    //  verify token

    const decoded = jwt.verify(token, process.env.SECRETKEY);

    // Attach user to request

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User Not found" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unknown error occured" });
  }
};

export default protect;
