import * as express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import routes from './server/routes/routes';

class App {
  public app: express.Application;
 
  constructor() {
    this.app = express();
    this.app.use(cors({ origin: 'http://localhost:3000' }));
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    dotenv.config({ path: '.env' });
  }

  private routes(): void {
    this.app.use('/', routes.router);
  }
}

export default new App().app;