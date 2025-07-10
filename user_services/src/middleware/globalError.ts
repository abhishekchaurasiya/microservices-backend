import { NextFunction, Request, Response } from "express";
import { ApiError, ErrorType } from "../utils/ApiError";
import Logger from "../utils/Logger";
import { environment } from "../config/config";
import { InternalServerError } from "../utils/CustomError";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) next(err);

  // Handle Custom Error
  if (err instanceof ApiError) {
    ApiError.hadler(err, res);

    // Logging
    if (err.type === ErrorType.INTERNAL) {
      Logger.error(
        `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    } else {
      Logger.error(
        `400 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    }
    Logger.error(err.message);

    if (environment === "development") {
      Logger.error("Stack Trace: ", err);
    }
    return;
  }
  // Handle all other errors as internal server error
  ApiError.hadler(new InternalServerError(), res);
};
