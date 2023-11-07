import mongoose from "mongoose";
import { config } from "./config";

export default () => {
  const connect = () => {
    mongoose
      .connect(config.DATABASE_URL!)
      .then(() => {
        console.log("Connected to database");
      })
      .catch((error: any) => {
        console.log(`DB Error: `, error);
        return process.exit(1);
      });
  };

  connect();

  mongoose.connection.on("disconnect", connect);
};
