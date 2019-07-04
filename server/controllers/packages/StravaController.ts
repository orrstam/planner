import { Request, Response, NextFunction } from 'express';
import * as strava from 'strava-v3';

interface IStravaController {
  auth(req: Request, res: Response): Promise<any>;
  token(req: Request, res: Response): Promise<any> | void;
  athlete(req: Request, res: Response): Promise<any> | void;
}

class StravaController implements IStravaController {
  async auth(req: Request, res: Response): Promise<any> {
    const url = await strava.oauth.getRequestAccessURL({
      scope: 'view_private,write'
    });

    res.send(url);
  }

  token(req: Request, res: Response): Promise<any> | void {
    const { code } = req.query;

    try {
      strava.oauth.getToken(code, function(
        err: any,
        payload: any,
        limits: any
      ) {
        if (err) {
          res.status(500).send('somthing went wrong');
        }

        res.send(payload);
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  athlete(req: Request, res: Response): Promise<any> | void {
    const { access_token } = req.query;

    strava.athlete.get(
      { access_token: access_token },
      (err: any, payload: any, limits: any) => {
        if (err) {
          console.log(err);
        }

        if (payload) {
          res.send(payload);
        }
      }
    );
  }

  activities(req: Request, res: Response) {
    const { page, access_token } = req.query;

    try {
      strava.athlete.listActivities(
        { access_token: access_token, page: page, per_page: 99 },
        (error: any, data: any) => {
          if (error) {
            throw Error(error);
          }

          res.send(data);
        }
      );
    } catch (error) {
      // console.log('ERROR ', error);
    }
  }
}

export default new StravaController();
