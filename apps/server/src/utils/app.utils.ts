import { config } from 'dotenv';
config();

export const SERVER_PORT = process.env.PORT;

export const MONGO_CONNECTION_URI = process.env.MONGO_URI;

export const NODE_ENV = process.env.NODE_ENV;

export const COOKIE_SEECRET_KEY_ONE = process.env.COOKIE_SECRET_KEY_ONE;

export const COOKIE_SEECRET_KEY_TWO = process.env.COOKIE_SECRET_KEY_TWO;

export const REDIS_PORT = process.env.REDIS_PORT;
