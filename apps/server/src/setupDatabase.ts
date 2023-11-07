import mongoose from "mongoose";

export default () => {
  const connect = () => {
    mongoose
      .connect("mongodb://127.0.0.1:27017/openwire")
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
