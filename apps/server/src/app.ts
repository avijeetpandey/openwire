import express, { type Express } from 'express';
import { OpenWireServer } from '@root/setupServer';
import connectToDatabase from '@root/setupDatabase';
import { config } from '@root/config';

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
    config.cloudinaryConfig();
  }
}

// creating application instance and intializing it
const application = new Application();
application.initialize();
