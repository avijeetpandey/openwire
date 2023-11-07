import {
  type Application,
  type Request,
  type Response,
  type NextFunction,
  json,
  urlencoded
} from "express";

import { Server } from "http";
import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";
import cookieSession from "cookie-session";
import HTTP_STATUS from "http-status-codes";
import "express-async-errors";
import compression from "compression";
import { config } from "./config";

export class OpenWireServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  private securityMiddleWare(app: Application): void {
    app.use(
      cookieSession({
        maxAge: 24 * 7 * 3600000,
        name: "session",
        keys: [config.COOKIE_SECRET_KEY_ONE!, config.COOKIE_SECRET_KEY_TWO!],
        secure: config.ENV !== "development"
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: "*",
        credentials: true, // for cookies to be used
        optionsSuccessStatus: 200,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
      })
    );
  }

  private standardMiddleWare(app: Application): void {
    app.use(compression());
    app.use(json({ limit: "50mb" }));
    app.use(urlencoded({ extended: true, limit: "50mb" }));
  }

  private routeMiddleWare(app: Application): void {}

  private globalErrorHandler(app: Application): void {}

  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer: Server = new Server(this.app);
      this.startHttpServer(httpServer);
    } catch (error) {
      console.log(error);
    }
  }

  private createSocketServer(httpServer: Server): void {}

  private startHttpServer(httpServer: Server): void {
    httpServer.listen(config.PORT, () => {
      console.log(`OperWire server up and running on port ${config.PORT}`);
    });
  }

  public start(): void {
    this.securityMiddleWare(this.app);
    this.standardMiddleWare(this.app);
    this.routeMiddleWare(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }
}
