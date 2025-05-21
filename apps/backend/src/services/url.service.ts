import { z } from "zod";
import { UrlModel } from "@/models/url.model";
import { CreateUrlDto, FindUrlByIdDto } from "@/dtos/url.dto";

export const index = () => {
  return UrlModel.find();
};

export const findById = (params: z.infer<typeof FindUrlByIdDto>) => {
  const dto = FindUrlByIdDto.parse(params);

  return UrlModel.findById(dto.id);
};

export const create = (params: z.infer<typeof CreateUrlDto>) => {
  const dto = CreateUrlDto.parse(params);

  const url = new UrlModel(dto);

  return url.save();
};
