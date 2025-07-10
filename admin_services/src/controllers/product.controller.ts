import { Request, Response } from "express";
import asyncHandler from "../helpers/asyncHandler";
import { ProductServices } from "../services/product.service";
import { CREATED, OK } from "../utils/StatusCode";
import { resMsg } from "../utils/resMsg";


// Add product
export const addProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await ProductServices.AddProduct(req.body);
  res
    .status(CREATED)
    .json({ message: resMsg.PRODUCT_ADDED_SUCCESSFULLY, product });
});

// Fetch product list
export const productList = asyncHandler(async (req: Request, res: Response) => {
  const products = await ProductServices.ProductList();
  res
    .status(OK)
    .json({ message: resMsg.PRODUCT_LIST_FETCHED_SUCCESSFULLY, products });
});

// Fetch single product
export const product = asyncHandler(async (req: Request, res: Response) => {
  const productId = req.params.productId.toString() || "";
  const product = await ProductServices.SingleProduct(productId);
  res
    .status(OK)
    .json({ message: resMsg.PRODUCT_FETCHED_SUCCESSFULLY, product });
});

// Update product stock
export const updateProductStock = asyncHandler(
  async (req: Request, res: Response) => {
    const productId = req.params.productId.toString() || "";
    const quantity = req.body.quantity || 0;
    const product = await ProductServices.UpdateProductStock(
      productId,
      quantity
    );
    res
      .status(OK)
      .json({ message: resMsg.PRODUCT_STOCK_UPDATED_SUCCESSFULLY, product });
  }
);
