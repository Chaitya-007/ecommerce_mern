import { hashPassword, comparePassword } from "./../helpers/authHelper.js";
import userSchema from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, role, answer } = req.body;

    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Address is Required" });
    }

    const existingUser = await userSchema.findOne({ email });

    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "User already exists, please login",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await new userSchema({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role,
      answer,
    }).save();

    res
      .status(201)
      .send({ success: true, message: "User created successfully", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({ message: "Invalid email or password" });
    }

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User does not exists",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: "Error in login",
      error,
    });
  }
};

export const testController = (req, res) => {
  try {
    res.status(200).send({ message: "Test controller" });
  } catch (error) {
    console.log({
      message: "error in controller",
      error,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ success: false, message: "Email is Required" });
    }
    if (!answer) {
      res.status(400).send({ success: false, message: "Answer is Required" });
    }
    if (!newPassword) {
      res
        .status(400)
        .send({ success: false, message: "New Password is Required" });
    }

    const user = await userSchema.findOne({ email, answer });

    if (!user) {
      res
        .status(404)
        .send({ success: false, message: "Wrong Email or Answer" });
    }

    const hashedPassword = await hashPassword(newPassword);

    await userSchema.findOneAndUpdate(user._id, { password: hashedPassword });

    res
      .status(200)
      .send({ success: true, message: "Password Updated Successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Something Went Wrong", error });
  }
};
