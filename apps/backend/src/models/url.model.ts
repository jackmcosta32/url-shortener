import mongoose, { Schema } from "mongoose";

const modelName = "Url";

const UrlSchema = new Schema({
  uri: { type: String },
  encodedUri: { type: String },
});

mongoose.model(modelName, UrlSchema);

export const UrlModel = mongoose.model(modelName);
