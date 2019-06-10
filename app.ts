import * as express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import routes from './server/routes/routes';
import passportSetup from './server/PassportSetup';
import customErrors from './server/helpers/errorHandler';
import { NextFunction } from 'connect';
import * as passport from 'passport';

interface Error {
  status: number,
  message: Text
}

class App {
  public app: express.Application;
 
  constructor() {
    this.app = express();
    this.app.use(cors({ origin: 'http://localhost:3000' }));
    this.config();
    this.routes();
    this.errorHandler();
  }

  public errorHandler() {
    this.app.use( async (error: customErrors | Error, req: express.Request, res: express.Response, next: NextFunction) => {

      if (error instanceof customErrors) {
        return res.status(error.status).send({
          error: error.code,
          message: error.message
        });
      } else {
        return res.status(error.status || 500).send({
          error: 'GENERIC',
          message: error.message
        });
      }

    });
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use(passport.initialize())

    dotenv.config({ path: '.env' });
  }

  private routes(): void {
    this.app.use('/', routes.router);
    new passportSetup();
  }
}

export default new App().app;