import { Request, Response, NextFunction } from 'express';
import { IController } from '../types/interfaces';
import Task from '../Models/Task';

class HomeController implements IController {
  async get(req: Request, res: Response, next: NextFunction): Promise<any> {
    const tasks = await Task.find();
    res.send(tasks);
  }

  async create(req: Request, res: Response): Promise<any> {
    const task = await (new Task( req.body )).save();
    res.send(task);
  }

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const id = req.body.id;
      const task = await Task.remove({ _id: id });
      res.send(task);
    } catch (error) {
      // Handle error
    }
  }
}

export default new HomeController;
