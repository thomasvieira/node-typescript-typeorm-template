import { createConnection, getConnectionOptions, Connection } from 'typeorm';

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions(); // From the .env file

  return createConnection(defaultOptions);
};
