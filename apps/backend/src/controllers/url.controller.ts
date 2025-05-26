import * as UrlServices from "@/services/url.service";
import * as HTTP_STATUS from "@/constants/status-code.constant";
import type { NextFunction, Request, Response } from "express";

export const index = async (
  _req: Request,
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
    const urlDocument = await UrlServices.findById({ id: req.params.id });

    res.status(HTTP_STATUS.OK).json(urlDocument);
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
    const urlDocument = await UrlServices.create(req.body);

    res.setHeader("Location", `/api/url/${urlDocument.id}`)

    res.status(HTTP_STATUS.CREATED).json(urlDocument);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json(error);
  }
};

export const findByEncodedUri = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const urlDocument = await UrlServices.findByEncodedUri({ encodedUri: req.params.encodedUri });

    if (!urlDocument) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Url not found" });
      
      return;
    }

    res.status(HTTP_STATUS.FOUND).json(urlDocument);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json(error);
  }
};

export const redirectToDecodedUri = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {  
  try {
    const urlDocument = await UrlServices.findByEncodedUri({ encodedUri: req.params.encodedUri });

    if (!urlDocument) {
      res.status(HTTP_STATUS.NOT_FOUND).send();
      
      return;
    }

    res.redirect(HTTP_STATUS.FOUND, urlDocument.uri);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).send();
  }
}