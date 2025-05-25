import mongoose from "mongoose";
import { inspect } from "node:util";
import { env } from "@/config/env.config";

const getConnectionUrl = () => {
  let connectionString = "mongodb://";

  if (env.DATABASE_HOST) {
    connectionString += env.DATABASE_HOST;
  }

  if (env.DATABASE_PORT) {
    connectionString += `:${env.DATABASE_PORT}`;
  }

  return connectionString;
};

export const configDatabase = async () => {
  try {
    const connectionUrl = getConnectionUrl();

    console.log({ connectionUrl });

    const client = await mongoose.connect(connectionUrl, {
      authSource: "admin",
      dbName: env.DATABASE_NAME,
      user: env.DATABASE_USERNAME,
      pass: env.DATABASE_PASSWORD,
      replicaSet: env.DATABASE_REPLICA_SET,
      directConnection: true,
    });

    console.log("Application has successfully connected with the database");

    return client;
  } catch (error) {
    console.error(
      `Application failed to connect to database with error:\n${inspect(error)}`
    );

    throw error;
  }
};
