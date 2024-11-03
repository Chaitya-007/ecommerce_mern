import JWT from "jsonwebtoken";
import userSchema from "../models/userModel.js";

// Protected Routes Token Base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    next();
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userSchema.findById(req.user._id);
    if (user !== 1) {
      return res
        .status(401)
        .send({ success: false, message: "UnAuthorized Access" });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
