import { Request, Response, NextFunction } from 'express';
import { IController } from '../types/interfaces';
import Type from '../Models/Type';

class TypesController implements IController {
  async get(req: Request, res: Response): Promise<any> {
    const types = await Type.find();
    res.send(types);
  }
}

export default new TypesController;
