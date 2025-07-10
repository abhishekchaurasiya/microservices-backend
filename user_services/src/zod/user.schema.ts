import mongoose from "mongoose";
import { z } from "zod";

export const userRegisterSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
});

export const placeOrderSchema = z.object({
  userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid user id",
  }),
  productId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid product id",
  }),
  quantity: z.number().gt(0, "Quantity must be greater than 0"),
});
