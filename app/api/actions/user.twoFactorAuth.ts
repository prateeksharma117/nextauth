"use server";

import nodemailer from "nodemailer";
import { dbConnection } from "../dbConnection";
import User from "../models/user.model";

export const twoFactorKey = async (req: any) => {
  try {
    await dbConnection();
    const { email } = req;
    const user = await User.findOne({ email });

    if (!user) {
      return { message: "User not found" };
    }

    const secret = Math.floor(1000 + Math.random() * 9000);

    user.twoFactorSecret = secret;
    await user.save();

    const mailOptions = {
      from: "ps9665748@gmail.com",
      to: email,
      subject: "Two factor authentication code",
      text: `Two factor authentication code`,
      html: `<p>Your two factor auth code:${secret}</p>`,
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

    await transporter.sendMail(mailOptions);
    return { message: "Two factor authentication code sent" };
  } catch (error: any) {
    return { message: "error occur" };
  }
};

export const verifyTwoFactor = async (req: any) => {
  try {
    await dbConnection();
    const { email, token } = req;

    const user = await User.findOne({ email });
    if (!user) {
      return { message: "User not found" };
    }

    const verified = user.twoFactorSecret === token;

    if (verified) {
      return { status: true };
    }
    return { status: false };
  } catch (error: any) {
    return { status: false, error: error.message };
  }
};
