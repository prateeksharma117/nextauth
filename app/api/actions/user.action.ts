"use server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import nodemailer from "nodemailer";
import path from "path";
import { dbConnection } from "../dbConnection";
import User from "../models/user.model";

export const registerUser = async (req: any) => {
  try {
    await dbConnection();
    const { name, email, password } = await req;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
  } catch (error: any) {
    return { status: false, error: error.message };
  }
};

export const findUserByEmail = async (req: any) => {
  try {
    await dbConnection();
    const { email } = await req;
    const user = await User.findOne({ email });
    return { user };
  } catch (error: any) {
    return { status: false, error: error.message };
  }
};

export const getAllUser = async () => {
  try {
    await dbConnection();
    const users = await User.find({});
    return JSON.stringify(users);
  } catch (error: any) {
    return { status: false, error: error.message };
  }
};

export const updateExistingUser = async (req: any) => {
  try {
    await dbConnection();

    const { email, ...updateData } = await req;
    if (!email) {
      return { message: "Email is required" };
    }
    const user = await User.findOneAndUpdate(
      { email },
      { $set: updateData },
      { new: true, upsert: true }
    );
    if (!user) {
      return { message: "User not found" };
    }
  } catch (error: any) {
    return { status: false, error: error.message };
  }
};

const transporter = nodemailer.createTransport({
  host: "mail.24livehost.com",
  port: 587,
  secure: false,
  auth: {
    user: "ds27@24livehost.com",
    pass: "ASA{{{I-]ht<JKMH*())(kjnkjkTOR",
  },
});

export const onForgetPassword = async ({ email, token }: any) => {
  const resetUrl = `${process.env.API_URL}/reset_password/${token}`;

  const mailOptions = {
    from: "ps9665748@gmail.com",
    to: email,
    subject: "Password Reset",
    text: `Reset your password within 1 Hour to successfully complete password reset request`,
    html: `
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
    `,
  };

  return transporter.sendMail(mailOptions);
};

export const resetPasswordMale = async (email: any) => {
  await dbConnection();
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { message: "User not found" };
    }

    const token = jwt.sign(
      { userId: user._id },
      "dfsdfq8903uesdifdsfsdiof90sf",
      {
        expiresIn: "1h",
      }
    );

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    await onForgetPassword({ email, token });

    return { message: "Password reset email sent" };
  } catch (error) {
    return { message: "Server error" };
  }
};

export const resetPassword = async (req: any) => {
  await dbConnection();
  const { token, password } = req;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return { message: "Invalid or expired token" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return { message: "Password reset successful" };
  } catch (error) {
    return { message: "Server error" };
  }
};

export const uploadUserImage = async (req: any) => {
  try {
    await dbConnection();

    const storage = await multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "public/profile_pic");
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
      },
    });

    const upload = multer({ storage });

    upload.single("avatar");

    const { email, filename } = req;
    const avatarUrl = `/profile_pic/${filename}`;

    const user = await User.findOne({ email });
    if (!user) {
      return { message: "User not found" };
    }

    user.image = avatarUrl;
    await user.save();

    return { message: "Profile image updated successfully", avatarUrl };
  } catch (error) {
    return { message: "Server error" };
  }
};
