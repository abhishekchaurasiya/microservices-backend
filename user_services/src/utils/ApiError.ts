import { Response } from "express";
import { SERVER_ERROR } from "./StatusCode";

// Define Error types
export enum ErrorType {
  BAD_REQUEST = "BadRequest",
  NOT_FOUND = "NotFound",
  FORBIDDEN = "Forbidden",
  INTERNAL = "Internal",
}

export class ApiError extends Error {
  type: ErrorType;
  statusCode: number;
  constructor(type: ErrorType, statusCode: number, message: string) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static hadler(err: ApiError, res: Response) {
    res.status(err.statusCode || SERVER_ERROR).json({
      message: err.message || "Internal server error",
      type: err.type || ErrorType.INTERNAL,
    });
  }
}
