import { type Application, type Request, type Response, type NextFunction, json, urlencoded } from 'express';

import { Server } from 'http';
import cors from 'cors';
import hpp from 'hpp';
import helmet from 'helmet';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import compression from 'compression';
import { config } from '@root/config';
import { Server as SocketServer } from 'socket.io';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import applicationRoutes from '@root/routes';
import HTTP_CODES from 'http-status-codes';
import { CustomError, IErrorResponse } from '@global/helpers/custom-error';
import Logger from 'bunyan';
import { SocketIOPostHandler } from '@socket/post';

const log: Logger = config.createLogger('server');

export class OpenWireServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  private securityMiddleWare(app: Application): void {
    app.use(
      cookieSession({
        maxAge: 24 * 7 * 3600000,
        name: 'session',
        keys: [config.COOKIE_SECRET_KEY_ONE!, config.COOKIE_SECRET_KEY_TWO!],
        secure: config.ENV !== 'development'
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: '*',
        credentials: true, // for cookies to be used
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
  }

  private standardMiddleWare(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
  }

  private routeMiddleWare(app: Application): void {
    applicationRoutes(app);
  }

  private globalErrorHandler(app: Application): void {
    app.all('*', (request: Request, response: Response) => {
      response.status(HTTP_CODES.NOT_FOUND).json({
        message: `${request.originalUrl} not found`
      });
    });

    // handling the custom errors
    app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
      log.error(error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.serializErrors());
      }
      next();
    });
  }

  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer: Server = new Server(app);
      const socketIO: SocketServer = await this.createSocketServer(httpServer);
      this.startHttpServer(httpServer);
      this.socketIOConnections(socketIO);
    } catch (error) {
      log.error(error);
    }
  }

  private async createSocketServer(httpServer: Server): Promise<SocketServer> {
    const io: SocketServer = new SocketServer(httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      }
    });

    const pubClient = createClient({ url: config.REDIS_URL });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);
    io.adapter(createAdapter(pubClient, subClient));

    return io;
  }

  private startHttpServer(httpServer: Server): void {
    log.info(`Server has started with process id:  ${process.pid}`);
    httpServer.listen(config.PORT, () => {
      log.info(`OperWire server up and running on port ${config.PORT}`);
    });
  }

  private socketIOConnections(io: SocketServer): void {
    const postSocketHandler: SocketIOPostHandler = new SocketIOPostHandler(io);
    postSocketHandler.listen();
  }

  public start(): void {
    this.securityMiddleWare(this.app);
    this.standardMiddleWare(this.app);
    this.routeMiddleWare(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }
}
