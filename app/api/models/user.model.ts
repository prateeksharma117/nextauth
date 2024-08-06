import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    image: { type: String},
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String },
    address: { type: String },
    country: { type: String },
    gender: { type: String },
    twoFactorSecret:{ type: String },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
