import {json, urlencoded} from 'body-parser';
import compress from 'compression';
import errorHandler from 'errorhandler';
import express, {Request, Response} from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import httpStatus from 'http-status';

import {registerRoutes} from './routes';
import morgan from 'morgan';

const cors = require('cors');

export class Server {
  private readonly _express: express.Express;
  private readonly port: string;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this._express = express();
    this._express.use(json());
    this._express.use(urlencoded({extended: true}));
    this._express.use(helmet.xssFilter());
    this._express.use(helmet.noSniff());
    this._express.use(helmet.hidePoweredBy());
    this._express.use(helmet.frameguard({action: 'deny'}));
    this._express.use(compress());
    this._express.use(morgan('tiny'));
    const router = Router();
    router.use(errorHandler());
    this._express.use(router);
    this.express.use(cors());
    registerRoutes(router);

    router.use((err: Error, req: Request, res: Response, next: Function) => {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this._express.listen(this.port, () => {
        console.log(
          `  {{TEMPLATE}} Backend App is running at http://localhost:${this.port} in ${this._express.get('env')} mode`
        );
        console.log('  Press CTRL-C to stop\n');
        resolve();
      });
    });
  }

  get express(): express.Express {
    return this._express;
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
