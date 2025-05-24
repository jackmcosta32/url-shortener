import type { NextFunction, Request, Response } from "express";
import * as HTTP_STATUS from "@/constants/status-code.constant";
import * as APPLICATION_STATUS from "@/constants/application-status.constant";

export const check = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(HTTP_STATUS.OK).json({
      status: APPLICATION_STATUS.HEALTHY
  });
};