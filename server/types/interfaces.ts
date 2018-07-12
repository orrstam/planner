import { Request, Response, NextFunction } from 'express';

export interface IController {
  get(req: Request, res: Response, next: NextFunction): any;
}
