import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { QueryFailedError } from "typeorm";
import { httpResponse } from "../helpers/http-response.helper";

type PossibleExceptions = QueryFailedError | Error;

export const httpExceptionMiddleware = (
  err: PossibleExceptions,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("reached exception middleware", err)
  if (err instanceof QueryFailedError) {
    httpResponse(
      res,
      StatusCodes.BAD_REQUEST,
      {
        errors: [{
          code: "BAD_REQUEST",
          field: err.column,
          message: err.message,
        }]
      }
    );
  }

  const message = err.message || 'Internal Server Error';
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: message });
};

export default httpExceptionMiddleware;
