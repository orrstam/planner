import * as express from 'express';
import {
  HomeController,
  TypesController,
  AuthController,
  StravaController
} from '../controllers';
import * as passport from 'passport';
import { NextFunction } from 'connect';
import CustomError from '../helpers/errorHandler';

class Routes {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes(): void {
    // Home routes
    this.router.post('/api/v1', HomeController.create);
    this.router.get('/api/v1', auth, HomeController.get);
    this.router.put('/api/v1', auth, HomeController.update);
    this.router.delete('/api/v1', HomeController.delete);
    this.router.get('/api/v1/deleted', auth, HomeController.getDeleted);
    this.router.put('/api/v1/restore', HomeController.restore);

    // User routes
    this.router.post('/api/v1/users/register', AuthController.create);
    this.router.post('/api/v1/users/login', AuthController.login);
    this.router.put('/api/v1/users/user/update', auth, AuthController.update);
    this.router.get('/api/v1/users/logout', AuthController.logout);
    this.router.get('/api/v1/users/user', auth, AuthController.user);

    // Type routes
    this.router.get('/api/v1/types', TypesController.get);

    /* Package routes */

    // Strava
    this.router.get('/api/v1/packages/strava/auth', StravaController.auth);
    this.router.get('/api/v1/packages/strava/token', StravaController.token);
      // Athlete
      this.router.get(
        '/api/v1/packages/strava/athlete',
        auth,
        StravaController.athlete
      );
      this.router.get(
        '/api/v1/packages/strava/athlete/activities',
        auth,
        StravaController.activities
      );
      this.router.get('/api/v1/packages/strava/athlete/stats', auth, StravaController.stats);

      // Activities
      this.router.get('/api/v1/packages/strava/activities/activity', auth, StravaController.activity);
  }
}

export const stravaAuth = (
  req: express.Request,
  res: express.Response,
  next: NextFunction
): any => {
  next();
};

export const auth = (
  req: express.Request,
  res: express.Response,
  next: NextFunction
): any => {
  passport.authenticate(
    'jwt',
    { session: false },
    (request: any, response: any, error: Error) => {
      try {
        if (error) {
          throw new CustomError('JWT_EXPIRED', 401, error.message);
        }

        req.user = response;

        next();
      } catch (error) {
        next(error);
      }
    }
  )(req, res, next);
};
export default new Routes();
