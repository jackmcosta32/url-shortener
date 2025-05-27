import { getCacheClient } from '@/config/cache.config';

export const set = (key: string, value: unknown, ttl?: number) => {
  const cacheClient = getCacheClient();

  try {
    if (ttl) {
      return cacheClient.setEx(key, ttl, JSON.stringify(value));
    }

    return cacheClient.set(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to set cache for key ${key}:`, error);

    throw error;
  }
};

export const get = async <TValue = unknown>(
  key: string,
): Promise<TValue | null> => {
  const cacheClient = getCacheClient();

  const value = await cacheClient.get(key);

  if (!value) return null;

  try {
    const parsedValue = JSON.parse(value) as TValue;

    return parsedValue;
  } catch {
    return value as TValue;
  }
};

export const destroy = (key: string) => {
  const cacheClient = getCacheClient();

  try {
    return cacheClient.del(key);
  } catch (error) {
    console.error(`Failed to delete cache for key ${key}:`, error);

    throw error;
  }
};
