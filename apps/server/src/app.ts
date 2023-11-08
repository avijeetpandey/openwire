import express, { type Express } from 'express';
import { OpenWireServer } from './setupServer';
import connectToDatabase from './setupDatabase';
import { config } from './config';

class Application {
  public initialize(): void {
    this.loadConfig();
    connectToDatabase();
    const app: Express = express();
    const server: OpenWireServer = new OpenWireServer(app);
    server.start();
  }

  private loadConfig(): void {
    config.validateConfig();
  }
}

// creating application instance and intializing it
const application = new Application();
application.initialize();
