import { observable, action } from 'mobx';
import * as moment from 'moment';
import api, { getToken } from '../services/api';
import { userStore } from './';

export default class StravaStore {
  @observable accessToken: string = '';

  @action
  setAccessToken(token: string) {
    this.accessToken = token;
  }

  async fetchAthlete(): Promise<any> {
    try {
      const user = await userStore.authenticate();
      const response = await api.get('/packages/strava/athlete', {
        params: { access_token: user.data.stravaToken },
        headers: { Authorization: `Bearer ${getToken()}` }
      });

      if (response.status === 200 && response.data) {
        this.setAccessToken(user.data.stravaToken);
        return response.data;
      }
    } catch (error) {
      console.log('fetchAthlete error: ', error);
      return Promise.reject(error);
    }
  }

  async getActivitiesByDates(b: moment.Moment, a: moment.Moment) {
    try {
      const response = await api.get('/packages/strava/athlete/activities', {
        params: {
          access_token: this.accessToken,
          page: 1,
          before: b.unix(),
          after: a.unix()
        },
        headers: { Authorization: `Bearer ${getToken()}` }
      });

      if (response.status === 200 && response.data) {
        return response.data;
      }
    } catch (error) {
      // 
    }
  }
}

export const stravaStore = new StravaStore();
