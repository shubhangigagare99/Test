import { config } from 'dotenv';
import IConfig from './IConfig';

config();
export const configuration: IConfig = Object.freeze({
  PORT: parseInt(process.env.PORT),
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URL: process.env.MONGO_URL,
});
