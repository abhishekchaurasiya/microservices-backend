import axios from "axios";
import { ProductDoc, ProductModel } from "../models/product.model";
import { BadRequestError } from "../utils/CustomError";
import { addProductSchema } from "../zod/product.schema";
import mongoose, { Types } from "mongoose";
import { resMsg } from "../utils/resMsg";

export const ProductServices = {
  // Add product by Admin
  async AddProduct(payload: ProductDoc) {
    const parsedPayload = addProductSchema.safeParse(payload);
    if (!parsedPayload.success) {
      throw new BadRequestError(resMsg.INVALID_PRODUCT_DETAILS);
    }
    const { title, description, price, stock } = parsedPayload.data;

    const existsProduct = await ProductModel.findOne({ title });
    if (existsProduct) throw new BadRequestError(resMsg.PRODUCT_ALREADY_EXISTS);

    const product = new ProductModel({ title, description, price, stock });
    if (!product) throw new BadRequestError(resMsg.PRODUCT_CREATION_FAILED);
    return await product.save();
  },

  // Get all products
  async ProductList() {
    const products = await ProductModel.find({});
    if (!products || products.length === 0) {
      throw new BadRequestError(resMsg.PRODUCT_NOT_FOUND);
    }
    return products;
  },

  async SingleProduct(productId: string) {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new BadRequestError(resMsg.INVALID_PRODUCT_ID);
    }
    const product = await ProductModel.findById(productId);
    if (!product) throw new BadRequestError(resMsg.PRODUCT_NOT_FOUND);
    return product;
  },

  // Update product stock
  async UpdateProductStock(productId: string, quantity: number) {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new BadRequestError(resMsg.INVALID_PRODUCT_ID);
    }

    if (quantity <= 0 || !Number.isInteger(quantity)) {
      throw new BadRequestError(resMsg.QUANTITY_MUST_BE_GREATER_THAN_0);
    }

    const product = await ProductModel.findById(productId);
    if (!product) throw new BadRequestError(resMsg.PRODUCT_NOT_FOUND);

    if (product.stock < quantity) {
      throw new BadRequestError(resMsg.INSUFFICIENT_STOCK);
    }

    product.stock -= quantity;
    return await product.save();
  },
};
