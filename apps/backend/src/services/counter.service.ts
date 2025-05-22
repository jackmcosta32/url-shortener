import { CounterModel } from "@/models/counter.model";

export const index = () => {
  return CounterModel.find();
};

const first = () => {
  return CounterModel.findOne();
};

const create = () => {
  const counter = new CounterModel();

  return counter.save();
};

const firstOrCreate = async () => {
  const counter = await first();

  if (counter) return counter;

  return create();
};

export const incrementCount = async () => {
  const counterDocument = await firstOrCreate();

  counterDocument.$inc('count', 1);

  return counterDocument.save();
}