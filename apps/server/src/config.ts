import {
  COOKIE_SEECRET_KEY_ONE,
  COOKIE_SEECRET_KEY_TWO,
  MONGO_CONNECTION_URI,
  NODE_ENV,
  REDIS_PORT,
  SERVER_PORT
} from "./utils/app.utils";

import bunyan from "bunyan";

class Config {
  public DATABASE_URL: string | undefined;
  public PORT: number | undefined;
  public ENV: string | undefined;
  public COOKIE_SECRET_KEY_ONE: string | undefined;
  public COOKIE_SECRET_KEY_TWO: string | undefined;
  public REDIS_URL: string | undefined;

  private readonly DEFAULT_DATABASE_URL: string =
    "mongodb://127.0.0.1:27017/openwire";

  private readonly DEFAULT_SERVER_PORT = 5175;

  private readonly DEFAULT_ENV: string = "development";

  private readonly DEFAULT_REDIS_URL: string = "redis://127.0.0.1:6379";

  constructor() {
    this.DATABASE_URL = MONGO_CONNECTION_URI || this.DEFAULT_DATABASE_URL;
    this.PORT = parseInt(SERVER_PORT!, 10) || this.DEFAULT_SERVER_PORT;
    this.ENV = NODE_ENV || this.DEFAULT_ENV;
    this.COOKIE_SECRET_KEY_ONE = COOKIE_SEECRET_KEY_ONE || "";
    this.COOKIE_SECRET_KEY_TWO = COOKIE_SEECRET_KEY_TWO || "";
    this.REDIS_URL = REDIS_PORT || this.DEFAULT_REDIS_URL;
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: "debug" });
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined`);
      }
    }
  }
}

export const config: Config = new Config();
