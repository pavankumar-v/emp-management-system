import { Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

export function httpResponse<T>(res: Response, status: StatusCodes, data?: T, errors?: { code: string, message: string, field?: string }): Response<T> {
  return res.status(status).json({
    status: status,
    message: getReasonPhrase(status),
    data,
    errors
  });
}
