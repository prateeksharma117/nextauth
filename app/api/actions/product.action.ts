"use server";

import { dbConnection } from "../dbConnection";
import Product from "../models/product.model";

export const addProduct = async (formData: any) => {
  try {
    await dbConnection();
    const product = new Product(JSON.parse(formData));
    await product.save();
    return { message: "Product Add successfully" };
  } catch (error: any) {
    return { message: "Server error" + error.message };
  }
};

export const getProduct = async (req: any) => {
  await dbConnection();

  const {
    search = "",
    sortField = "productName",
    sortOrder = "asc",
    page = 1,
    limit = 10,
  } = req;

  try {
    let query = {};
    if (search) {
      query = {
        $or: [
          { productName: { $regex: search, $options: "i" } },
          { productDescription: { $regex: search, $options: "i" } },
          { brand: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
          { tags: { $regex: search, $options: "i" } },
          { subCategory: { $regex: search, $options: "i" } },
          { color: { $regex: search, $options: "i" } },
        ],
      };
    }

    let sort: { [key: string]: "asc" | "desc" } = {};

    if (sortField && sortOrder) {
      sort[sortField] = sortOrder === "asc" ? "asc" : "desc";
    }
    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    const total = await Product.countDocuments(query);

    return JSON.stringify({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return "Internal server error"
  }
};

export const deleteProduct = async (productId: any) => {
  try {
    await dbConnection();
    const result = await Product.findByIdAndDelete(productId);

    if (!result) {
      return { message: "Product not found" };
    }
    return { message: "Product delete successfully" };
  } catch (error: any) {
    return { message: "Server error" + error.message };
  }
};

export const getProductById = async (productId: any) => {
  try {
    await dbConnection();
    const result = await Product.findById(productId);

    if (!result) {
      return { message: "Product not found" };
    }
    return JSON.stringify(result);
  } catch (error: any) {
    return error.message;
  }
};

export const updateProductById = async (req: any) => {
  try {
    await dbConnection();
    req = JSON.parse(req);

    const { productId, ...updateData } = await req;
    if (!productId) {
      return { message: "ProductId is required" };
    }

    console.log(updateData);

    const productData = await Product.findOneAndUpdate(
      { _id: productId },
      { $set: updateData },
      { new: true, upsert: false }
    );

    if (!productData) {
      return { status: false, message: "Product not found" };
    }
  } catch (error: any) {
    return { status: false, error: error.message };
  }
};
