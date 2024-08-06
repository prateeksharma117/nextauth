import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Orders = models?.Orders || mongoose.model("Orders", userSchema);

export default Orders;
