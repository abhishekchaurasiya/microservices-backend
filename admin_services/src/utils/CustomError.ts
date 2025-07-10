import { ApiError, ErrorType } from "./ApiError";

export class BadRequestError extends ApiError {
  constructor(message: string = "Bad Request") {
    super(ErrorType.BAD_REQUEST, 400, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Not Found") {
    super(ErrorType.NOT_FOUND, 404, message);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = "Forbidden") {
    super(ErrorType.FORBIDDEN, 403, message);
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string = "Internal Server Error") {
    super(ErrorType.INTERNAL, 500, message);
  }
}
