import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUD_NAME,
  COOKIE_SEECRET_KEY_ONE,
  COOKIE_SEECRET_KEY_TWO,
  JSON_WEB_TOKEN_SECRET,
  MONGO_CONNECTION_URI,
  NODE_ENV,
  REDIS_PORT,
  SERVER_PORT
} from '@root/utils/constants';

import { v2 as cloudinary } from 'cloudinary';

import bunyan from 'bunyan';

class Config {
  public DATABASE_URL: string | undefined;
  public PORT: number | undefined;
  public ENV: string | undefined;
  public COOKIE_SECRET_KEY_ONE: string | undefined;
  public COOKIE_SECRET_KEY_TWO: string | undefined;
  public REDIS_URL: string | undefined;
  public CLOUD_NAME: string | undefined;
  public CLOUDINARY_API_KEY: string | undefined;
  public CLOUDINARY_API_SECRET: string | undefined;
  public JSON_TOKEN_SECRET: string | undefined;

  private readonly DEFAULT_DATABASE_URL: string = 'mongodb://127.0.0.1:27017/openwire';

  private readonly DEFAULT_SERVER_PORT = 5175;

  private readonly DEFAULT_ENV: string = 'development';

  private readonly DEFAULT_REDIS_URL: string = 'redis://127.0.0.1:6379';

  constructor() {
    this.DATABASE_URL = MONGO_CONNECTION_URI || this.DEFAULT_DATABASE_URL;
    this.PORT = parseInt(SERVER_PORT!, 10) || this.DEFAULT_SERVER_PORT;
    this.ENV = NODE_ENV || this.DEFAULT_ENV;
    this.COOKIE_SECRET_KEY_ONE = COOKIE_SEECRET_KEY_ONE || '';
    this.COOKIE_SECRET_KEY_TWO = COOKIE_SEECRET_KEY_TWO || '';
    this.REDIS_URL = REDIS_PORT || this.DEFAULT_REDIS_URL;
    this.CLOUD_NAME = CLOUD_NAME;
    this.CLOUDINARY_API_SECRET = CLOUDINARY_API_SECRET;
    this.CLOUDINARY_API_KEY = CLOUDINARY_API_KEY;
    this.JSON_TOKEN_SECRET = JSON_WEB_TOKEN_SECRET;
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: 'debug' });
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined`);
      }
    }
  }

  public cloudinaryConfig(): void {
    cloudinary.config({
      cloud_name: this.CLOUD_NAME!,
      api_key: this.CLOUDINARY_API_KEY!,
      api_secret: this.CLOUDINARY_API_SECRET!
    });
  }
}

export const config: Config = new Config();
