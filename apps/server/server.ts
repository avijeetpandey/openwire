import express, { type Application } from "express";
import { config } from "dotenv";
config();

const app: Application = express();

app.listen(process.env.PORT, () => {
  console.log(`OpenWire server up and running on port ${process.env.PORT}`);
});
