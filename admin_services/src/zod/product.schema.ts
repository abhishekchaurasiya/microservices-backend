import mongoose from "mongoose";
import { z } from "zod";

export const addProductSchema = z.object({
  title: z.string().min(3).max(50).trim(),
  description: z.string().min(3).max(400).trim(),
  price: z.number().gt(0, "Price must be greater than 0"),
  stock: z
    .number()
    .gt(0, "Stock must be greater than 0")
    .int("Stock quantity must be a whole number"),
});


