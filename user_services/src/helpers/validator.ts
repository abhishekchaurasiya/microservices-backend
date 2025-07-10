import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";
import { BadRequestError } from "../utils/CustomError";

export enum ValidatorSource {
  BODY = "body",
  PARAMS = "params",
  QUERY = "query",
  HEADERS = "headers",
}

export const zodValidator = (
  schema: ZodSchema,
  source: ValidatorSource = ValidatorSource.BODY
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = schema.parse(req[source]);
      Object.assign(req[source], data);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.errors.map((err) => err.message).join(", ");
        // const message = error.issues[0].message;
        return next(new BadRequestError(message));
      }
      console.log("complete error: ", error);
      next(error); // If it's not a ZodError, Pass it to the next middleware handler
    }
  };
};
