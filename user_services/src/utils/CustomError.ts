import { ApiError, ErrorType } from "./ApiError";
import { BAD_REQUEST, FORBIDDEN, NOT_FOUND, SERVER_ERROR } from "./StatusCode";

export class BadRequestError extends ApiError {
  constructor(message: string = "Bad Request") {
    super(ErrorType.BAD_REQUEST, BAD_REQUEST, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Not Found") {
    super(ErrorType.NOT_FOUND, NOT_FOUND, message);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = "Forbidden") {
    super(ErrorType.FORBIDDEN, FORBIDDEN, message);
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string = "Internal Server Error") {
    super(ErrorType.INTERNAL, SERVER_ERROR, message);
  }
}
