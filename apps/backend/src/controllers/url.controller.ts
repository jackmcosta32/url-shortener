import * as UrlServices from "@/services/url.service";
import * as HTTP_STATUS from "@/constants/status-code.constant";
import type { NextFunction, Request, Response } from "express";

export const index = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const urlEntities = await UrlServices.index();

    res.status(HTTP_STATUS.OK).json(urlEntities);
  } catch (error) {
    res.status(HTTP_STATUS.NOT_FOUND).json(error);
  }
};

export const findById = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const urlEntity = await UrlServices.findById({ id: req.params.id });

    res.status(HTTP_STATUS.OK).json(urlEntity);
  } catch (error) {
    res.status(HTTP_STATUS.NOT_FOUND).json(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const urlEntity = await UrlServices.create(req.body);

    res.status(HTTP_STATUS.CREATED).json(urlEntity);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json(error);
  }
};
