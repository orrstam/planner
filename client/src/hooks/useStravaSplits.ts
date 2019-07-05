import * as React from 'react';
import * as moment from 'moment';
import { distanceToKm, secondsToMinutes } from '../services/helpers';
import api, { getToken } from '../services/api';
import {stravaStore} from '../stores/StravaStore';

interface ISplits {
  monthly: number;
  yearly: number;
  all_time: number;
  done: boolean;
}

export function useStravaSplits(splitsSearch: boolean): ISplits | undefined {
  const [splits, setSplits] = React.useState<ISplits>();

  React.useEffect(() => {
    async function fetchStats() {
      const month = moment().subtract(1, 'month').format('X');
      const year = moment().startOf('year').format('X');

      const response = await api.get('/packages/strava/athlete/activities', {
        params: {
          access_token: stravaStore.accessToken,
          page: 1,
        },
        headers: { Authorization: `Bearer ${getToken()}` }
      });

      if (response && response.data) {
        let splits: number[] = [];
        let splitsMonth: number[] = [];
        let splitsYear: number[] = [];

        response.data.map((activity: Planner.Strava.Activity) => {
          const split = parseFloat(secondsToMinutes(activity.moving_time)) / distanceToKm(activity.distance);
          const startDate = moment(activity.start_date).format('X');

          if (startDate > year) {
            splitsYear.push(split);
          }

          if (startDate > month) {
            splitsMonth.push(split);
          }

          splits.push(split);
        });

        const a = splits.reduce((x, y) => x + y, 0) / splits.length;
        const m = splitsMonth.reduce((x, y) => x + y, 0) / splitsMonth.length;
        const y = splitsYear.reduce((x, y) => x + y, 0) / splitsYear.length;

        setSplits({
          monthly: m,
          yearly: y,
          all_time: a,
          done: true
        });
      }
    }

    if (stravaStore.accessToken && splitsSearch) {
      fetchStats();
    }
  }, [stravaStore.accessToken, splitsSearch]);

  return splits;
}
