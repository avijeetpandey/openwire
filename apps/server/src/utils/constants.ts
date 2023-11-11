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

export const JSON_WEB_TOKEN_SECRET = process.env.JSON_TOKEN_SECRET;

export const SENDER_EMAIL = process.env.SENDER_EMAIL;

export const SENDER_EMAIL_PASSWORD = process.env.SENDER_EMAIL_PASSWORD;

export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

export const SENDGRID_SENDER = process.env.SENDGRID_SENDER;

export const CLIENT_URL = process.env.CLIENT_URL;

export const BASE_PATH = '/api/v1';
