import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    basePrice: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    quantity: { type: Number, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: String, required: true },
    subCategory: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    productImages: [{url: { type: String }}],
    details: [{text: { type: String }}]
  },
  { timestamps: true }
);

const Product = models.Product || mongoose.model("Product", userSchema);

export default Product;
