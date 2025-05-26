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

    res.status(HTTP_STATUS.CREATED).json(urlDocument);
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
    console.log("Received request to redirect for encoded URI:", req.params.encodedUri);

    const urlDocument = await UrlServices.findByEncodedUri({ encodedUri: req.params.encodedUri });

    console.log("Redirecting to decoded URI:", urlDocument);

    if (!urlDocument) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Url not found" });
      
      return;
    }

    res.redirect(HTTP_STATUS.FOUND, urlDocument.uri);
  } catch (error) {
    console.error("Error redirecting to decoded URI:", error);

    res.status(HTTP_STATUS.NOT_FOUND).json(error);
  }
}