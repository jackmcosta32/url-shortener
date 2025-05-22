import mongoose, { Schema } from "mongoose";
import type { ICounter } from "@/interfaces/entities/counter.interface";

const modelName = "Counter";

const CounterSchema = new Schema<ICounter>({
  count: { type: Number, required: true, default: 0 },
});

export const CounterModel = mongoose.model<ICounter>(modelName, CounterSchema);
