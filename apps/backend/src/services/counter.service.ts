import { CounterModel } from '@/models/counter.model';
import { RootFilterQuery, SaveOptions } from 'mongoose';

export const index = () => {
  return CounterModel.find();
};

const first = (filter?: RootFilterQuery<typeof CounterModel>) => {
  return CounterModel.findOne(filter);
};

const create = (options?: SaveOptions) => {
  const counter = new CounterModel();

  return counter.save(options);
};

const firstOrCreate = async (
  filter?: RootFilterQuery<typeof CounterModel>,
  options?: SaveOptions,
) => {
  const counter = await first(filter);

  if (counter) return counter;

  return create(options);
};

export const incrementCount = async (
  filter?: RootFilterQuery<typeof CounterModel>,
  options?: SaveOptions,
) => {
  const counterDocument = await firstOrCreate(filter, options);

  counterDocument.$session(options?.session);

  counterDocument.$inc('count', 1);

  return counterDocument.save();
};
