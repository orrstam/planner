import { Request, Response, NextFunction } from 'express';
import { IController } from '../types/interfaces';
import Task from '../Models/Task';

class HomeController implements IController {
  async create(req: Request, res: Response): Promise<any> {
    const task = await new Task(req.body).save();
    const populatedTask = await Task.findOne({ _id: task._id }).populate(
      'types'
    );
    res.send(populatedTask);
  }

  async get(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { user } = req.user;

    const tasks = await Task.find({
      users: { $in: [user._id] }
    })
      .sort({ created: 'desc' })
      .populate('types');

    res.send(tasks);
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const task = await Task.findByIdAndUpdate(
        req.body._id,
        { $set: req.body },
        { new: true }
      ).populate('types');

      res.send(task);
    } catch (error) {
      // Handle error
      res.status(500).send(error);
    }
  }

  async getDeleted(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const tasks = await Task.findDeleted();
    res.send(tasks);
  }

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const id = req.body.id;
      const task = await Task.delete({ _id: id });
      res.send(task);
    } catch (error) {
      // Handle error
    }
  }

  async restore(req: Request, res: Response): Promise<any> {
    try {
      const id = req.body.id;
      const task = await Task.restore({ _id: id });
      res.send(task);
    } catch (error) {
      // Handle error
    }
  }
}

export default new HomeController();
