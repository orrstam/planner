import { Request, Response, NextFunction } from 'express';

export interface IController {
  create?(req: Request, res: Response, next: NextFunction): Promise<any>;
  get?(req: Request, res: Response, next: NextFunction): Promise<any>;
  update?(req: Request, res: Response, next: NextFunction): Promise<any>;
  getDeleted?(req: Request, res: Response, next: NextFunction): Promise<any>;
  delete?(req: Request, res: Response): Promise<any>;
  restore?(req: Request, res: Response): Promise<any>;
}

export interface StravaActivity {
  moving_time: number;
  distance: number;
  start_date: number;
  type: string;
}