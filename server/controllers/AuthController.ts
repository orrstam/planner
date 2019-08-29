import { Request, Response } from 'express';
import { hash } from 'bcrypt';
import * as passport from 'passport';
import { sign } from 'jsonwebtoken';
import { NextFunction } from 'connect';
import { IController } from '../types/interfaces';
import User from '../Models/User';
import CustomError from '../helpers/errorHandler';

class AuthController implements IController {
  async user(req: Request, res: Response): Promise<any> {
    try {
      const { user } = req.user;
      const updatedUser = await User.findById(user._id).exec();

      res.status(200).send(updatedUser);
    } catch (error) {
      // Handle error
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    const password = await hash(req.body.password, 10);
    const username = req.body.username;

    User.findOne({ username }).exec((error, user) => {
      let msgObj = {};

      if (error) {
        // Handle error
        msgObj = new Error('Error when trying to create user');
      }

      if (user) {
        msgObj = new CustomError('EXISTS', 409, 'User already exists');
      }

      if (Object.keys(msgObj).length) {
        next(msgObj);
      } else {
        const user = new User({ username, password });
        user.save();

        passport.authenticate('local', { session: false });

        const token = sign({ user }, 'GINGERBREAD', { expiresIn: '50m' });

        res.status(200).send({ token, username });
      }
    });
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<any> {
    const updateValues = { ...req.body };
    delete updateValues.id;

    try {
      if ('packages' in updateValues) {
        const { packages } = updateValues;
        delete updateValues.packages;

        const updated = await User.updateOne(
          { _id: req.body.id },
          {
            $addToSet: { packages: packages },
            $set: updateValues
          },
          { new: true }
        );
      } else {
        const updated = await User.updateOne(
          { _id: req.body.id },
          { $set: updateValues },
          { new: true }
        );
      }
    } catch (error) {
      //
    }
    //
  }

  logout(req: Request, res: Response): void {
    req.logout();
    res.send({ data: 'logged out' });
  }

  login(req: Request, res: Response, next: NextFunction): any {
    passport.authenticate('local', { session: false }, (error, user) => {
      try {
        if (error || !user) {
          throw new CustomError(error.code, 401, error.message);
        }

        req.login(user.username, { session: false }, null);

        const token = sign(
          {
            user
          },
          'GINGERBREAD',
          { expiresIn: '50m' }
        );

        res.status(200).send({ token, user });
      } catch (error) {
        console.log(error);
        return next(error);
      }
    })(req, res, next);
  }
}

export default new AuthController();
