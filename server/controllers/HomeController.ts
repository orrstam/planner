import { Request, Response, NextFunction } from 'express';
import { IController } from '../types/interfaces';

class HomeController implements IController {
  get(req: Request, res: Response, next: NextFunction): any {
    res.send({ message: 'Hello from API' });
  }

  timeout(req: Request, res: Response, next: NextFunction): any {
    setTimeout(() => { next(); }, 7000);
  }
}

export default new HomeController;
