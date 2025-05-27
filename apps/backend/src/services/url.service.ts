import { z } from 'zod';
import mongoose from 'mongoose';
import { UrlModel } from '@/models/url.model';
import { ONE_DAY } from '@/constants/time.constant';
import * as CacheService from '@/services/cache.service';
import * as CounterService from '@/services/counter.service';
import { encodeBase62 } from '@/utils/encoding/encode-base62';
import type { IUrl } from '@/interfaces/entities/url.interface';
import { getUrlCacheKey } from '@/utils/cache/get-url-cache-key';
import {
  CreateUrlDto,
  FindUrlByEncodedUriDto,
  FindUrlByIdDto,
} from '@/dtos/url.dto';

export const index = () => {
  return UrlModel.find();
};

export const findById = (params: z.infer<typeof FindUrlByIdDto>) => {
  const dto = FindUrlByIdDto.parse(params);

  return UrlModel.findById(dto.id);
};

export const create = async (params: z.infer<typeof CreateUrlDto>) => {
  const dto = CreateUrlDto.parse(params);

  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const counterDocument = await CounterService.incrementCount(undefined, {
      session,
    });

    const url = new UrlModel({
      uri: dto.uri,
      encodedUri: encodeBase62(counterDocument.count),
    });

    url.$session(session);

    const urlDocument = await url.save();

    await session.commitTransaction();

    await session.endSession();

    return urlDocument;
  } catch (error) {
    await session.abortTransaction();

    await session.endSession();

    throw error;
  }
};

export const findByEncodedUri = async (
  params: z.infer<typeof FindUrlByEncodedUriDto>,
) => {
  const dto = FindUrlByEncodedUriDto.parse(params);

  const cacheKey = getUrlCacheKey(dto.encodedUri);

  const cachedEntry = await CacheService.get<IUrl>(cacheKey);

  if (cachedEntry) return cachedEntry;

  const urlDocument = await UrlModel.findOne({ encodedUri: dto.encodedUri });

  await CacheService.set(dto.encodedUri, urlDocument, ONE_DAY);

  return urlDocument;
};
