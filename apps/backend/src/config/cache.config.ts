import { inspect } from 'util';
import { env } from './env.config';
import { createClient, type RedisClientType } from 'redis';

let cacheClient: RedisClientType | null = null;

const getConnectionUrl = () => {
  let connectionString = 'redis://';

  if (env.CACHE_SERVICE_HOST) {
    connectionString += `${env.CACHE_SERVICE_HOST}:`;
  }

  if (env.CACHE_SERVICE_PORT) {
    connectionString += env.CACHE_SERVICE_PORT;
  }

  return connectionString;
};

export const configCache = async () => {
  try {
    const connectionUrl = getConnectionUrl();

    cacheClient = await createClient({
      url: connectionUrl,
    });

    await cacheClient.connect();

    console.log('Application has successfully connected with the cache');

    return cacheClient;
  } catch (error) {
    console.error(
      `Application failed to connect to cache with error:\n${inspect(error)}`,
    );

    throw error;
  }
};

export const getCacheClient = () => {
  if (!cacheClient) {
    throw new Error(
      'Cache client is not initialized. Please call configCache first.',
    );
  }

  return cacheClient;
};
