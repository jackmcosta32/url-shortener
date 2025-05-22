import { z } from "zod";
import mongoose from "mongoose";
import { UrlModel } from "@/models/url.model";
import { encodeBase62 } from "@/utils/encoding/encodeBase62";
import * as CounterService from "@/services/counter.service";
import { CreateUrlDto, FindUrlByEncodedUriDto, FindUrlByIdDto } from "@/dtos/url.dto";

export const index = () => {
  return UrlModel.find();
};

export const findById = (params: z.infer<typeof FindUrlByIdDto>) => {
  const dto = FindUrlByIdDto.parse(params);

  return UrlModel.findById(dto.id);
};

export const create = async (params: z.infer<typeof CreateUrlDto>) => {
  const dto = CreateUrlDto.parse(params);

  const session = await mongoose.startSession()
  
  session.startTransaction();

  const counterDocument = await CounterService.incrementCount()
  
  counterDocument.$session(session);

  const url = new UrlModel({
    uri: dto.uri,
    encodedUri: encodeBase62(counterDocument.count),
  });

  const urlDocument = await url.save()
  
  urlDocument.$session(session);

  await session.commitTransaction();
  
  await session.endSession();

  return urlDocument;
};

export const findByEncodedUri = (params: z.infer<typeof FindUrlByEncodedUriDto>) => {
  const dto = FindUrlByEncodedUriDto.parse(params);
 
  return UrlModel.findOne({ encodedUri: dto.encodedUri });
}