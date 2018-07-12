import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import HomeController from '../controllers/HomeController'

class Routes {
  public router: express.Router

  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes(): void {
    this.router.get('/api/v1', HomeController.timeout, HomeController.get);
  }
}

export default new Routes;