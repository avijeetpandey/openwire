import { config } from 'dotenv';
config();

export const SERVER_PORT = process.env.PORT;

export const MONGO_CONNECTION_URI = process.env.MONGO_URI;

export const NODE_ENV = process.env.NODE_ENV;

export const COOKIE_SEECRET_KEY_ONE = process.env.COOKIE_SECRET_KEY_ONE;

export const COOKIE_SEECRET_KEY_TWO = process.env.COOKIE_SECRET_KEY_TWO;

export const REDIS_PORT = process.env.REDIS_PORT;

export const CLOUD_NAME = process.env.CLOUD_NAME;

export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;

export const BASE_PATH = '/api/v1';
