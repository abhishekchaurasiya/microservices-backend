import { Request, Response } from "express";
import asyncHandler from "../helpers/asyncHandler";
import { UserServices } from "../services/user.service";
import { resMsg } from "../utils/resMsg";
import { CREATED } from "../utils/StatusCode";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await UserServices.RegisterUser(req.body);
    res.status(CREATED).json(user);
  }
);

export const placeOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await UserServices.PlaceOrder(req.body);
  res
    .status(CREATED)
    .json({ message: resMsg.ORDER_PLACED_SUCCESSFULLY, order });
});
