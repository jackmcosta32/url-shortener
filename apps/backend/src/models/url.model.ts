import mongoose, { Schema } from 'mongoose';
import type { IUrl } from '@/interfaces/entities/url.interface';

const modelName = 'Url';

const UrlSchema = new Schema<IUrl>({
  uri: { type: String, required: true },
  encodedUri: { type: String, required: true, unique: true, index: true },
});

export const UrlModel = mongoose.model<IUrl>(modelName, UrlSchema);
