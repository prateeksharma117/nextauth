"use server";

import { dbConnection } from "../dbConnection";
import Orders from "../models/orders.model";
import Product from "../models/product.model";

export const createOrder = async (req: any) => {
  await dbConnection();
  if (!req) {
    return { error: "ProductId and quantity are required" };
  }
  try {
    const newOrder = new Orders(JSON.parse(req));
    await newOrder.save();
    return { message: "Order Add successfully" };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getOrder = async () => {
  await dbConnection();
  try {
    await Product.find();
    const orders = await Orders.find().populate('productId')
    return JSON.stringify(orders)
  } catch (error: any) {
    console.log(error)
    throw new Error(error);
  }
};
