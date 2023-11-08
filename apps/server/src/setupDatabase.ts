import mongoose from "mongoose";
import { config } from "./config";
import Logger from "bunyan";

const log: Logger = config.createLogger("database");

export default () => {
  const connect = () => {
    mongoose
      .connect(config.DATABASE_URL!)
      .then(() => {
        log.info("Connected to database");
      })
      .catch((error: any) => {
        log.error(`DB Error: `, error);
        return process.exit(1);
      });
  };

  connect();

  mongoose.connection.on("disconnect", connect);
};
