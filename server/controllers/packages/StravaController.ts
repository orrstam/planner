import { Request, Response, NextFunction } from 'express';
import * as strava from 'strava-v3';
import { StravaActivity } from '../../types/interfaces';

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

  stats(req: Request, res: Response) {
    const { access_token } = req.query;

    try {
      strava.athletes.stats({access_token: access_token, id: 27017939}, (error: any, data: any) => {
        if (error) {
          throw Error(error);
        }

        res.send(data);
      });
    } catch(err) {
      console.log('err ', err);
    }
  }

  activity(req: Request, res: Response) {
    const { access_token, id } = req.query;

    strava.activities.get({ access_token: access_token, id: id, }, (error: any, data: any) => {
      if (error) {
        throw Error(error)
      }

      res.send(data);
    });
  }

  activities(req: Request, res: Response) {
    const { page, access_token, before, after } = req.query;

    try {
      strava.athlete.listActivities(
        { access_token: access_token, page: page, after: after, before: before, per_page: 99 },
        (error: any, data: any) => {
          if (error) {
            throw Error(error);
          }

          const filtered = data.filter((item: StravaActivity) => { 
            return item.type === 'Run' 
          });

          res.send(filtered);
        }
      );
    } catch (error) {
      console.log('ERROR ', error);
    }
  }
}

export default new StravaController();
