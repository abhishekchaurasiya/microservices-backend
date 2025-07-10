import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../utils/CustomError";

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return next(new NotFoundError("Route not found"));
};
