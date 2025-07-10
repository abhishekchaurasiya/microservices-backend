import { Request, Response } from "express";
import asyncHandler from "../helpers/asyncHandler";
import { sanitizeInput } from "../helpers/sanitizeInput";
import { UserServices } from "../services/user.service";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const cleandata = sanitizeInput(req.body);
    const user = await UserServices.RegisterUser(cleandata);
    res.status(201).json(user);
  }
);

export const placeOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await UserServices.PlaceOrder(req.body);
  res.status(201).json({ message: "Successfully order placed.", order });
});
