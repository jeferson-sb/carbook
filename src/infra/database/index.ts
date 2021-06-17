import { createConnection, getConnectionOptions } from 'typeorm';

interface ConnectionOptions {
  host: string;
}

getConnectionOptions().then((options) => {
  const newOptions = options as ConnectionOptions;
  newOptions.host = process.env.DATABASE_HOST;
  createConnection({
    ...options,
  });
});
