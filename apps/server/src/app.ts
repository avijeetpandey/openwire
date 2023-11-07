import express, { type Express } from "express";

import { OpenWireServer } from "./setupServer";

class Application {
  public initialize(): void {
    const app: Express = express();
    const server: OpenWireServer = new OpenWireServer(app);
    server.start();
  }
}

// creating application instance and intializing it
const application = new Application();
application.initialize();
