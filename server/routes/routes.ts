import * as express from 'express';
import { HomeController, TypesController } from '../controllers'

class Routes {
  public router: express.Router

  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes(): void {
    // Home routes
    this.router.post('/api/v1', HomeController.create);
    this.router.get('/api/v1', HomeController.get);
    this.router.put('/api/v1', HomeController.update);
    this.router.delete('/api/v1', HomeController.delete);
    this.router.get('/api/v1/deleted', HomeController.getDeleted);
    this.router.put('/api/v1/restore', HomeController.restore);

    // Type routes
    this.router.get('/api/v1/types', TypesController.get);
  }
}

export default new Routes;