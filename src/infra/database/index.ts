import { Connection, createConnection, getConnectionOptions } from 'typeorm';

interface ConnectionOptions {
  host: string;
}

getConnectionOptions().then((options) => {
  const newOptions = options as ConnectionOptions;
  newOptions.host = process.env.DATABASE_HOST;

  createConnection({ ...options });
});

export default async (host = 'database'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  return createConnection({ ...defaultOptions, host });
};
