import * as React from 'react';
import * as moment from 'moment';
import { distanceToKm, secondsToMinutes } from '../services/helpers';
import api, { getToken } from '../services/api';
import {stravaStore} from '../stores/StravaStore';

interface IStats {
  current: {
    distance: number;
    splits: number;
    activities: number;
    distancePerActivity: number;
  },
  comparison: {
    distance: number;
    splits: number;
    activities: number;
    distancePerActivity: number;
  }
  done: boolean;
}

function requestData(b: moment.Moment, a: moment.Moment) {
  return {
    params: {
      access_token: stravaStore.accessToken,
      page: 1,
      before: b.unix(),
      after: a.unix()
    },
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

function mapResponseData(data: any) {
  let splits: number[] = [];
  let distance: number = 0;
  let distances: number[] = [];

  data.map((activity: Planner.Strava.Activity) => {
    const split = parseFloat(secondsToMinutes(activity.moving_time)) / distanceToKm(activity.distance);

    distance = distance + distanceToKm(activity.distance);
    distances.push(distanceToKm(activity.distance));
    splits.push(split);
  });

  const split = splits.reduce((x, y) => x + y, 0) / splits.length;
  const distancePerActivity = distances.reduce((x, y) => x + y, 0) / distances.length;

  return {
    splits: split,
    distance: distance,
    distancePerActivity: distancePerActivity,
    activities: data.length
  }
}

export function useComparisonStats(search: boolean, period: moment.unitOfTime.StartOf): IStats | undefined {
  const [stats, setStats] = React.useState<IStats>();

  const before = moment().endOf(period);
  const after = moment().endOf(period).subtract(1, period as moment.unitOfTime.DurationConstructor);

  React.useEffect(() => {
    async function fetchStats() {
      const response = await api.get('/packages/strava/athlete/activities', requestData(before, after));

      if (response && response.data) {
        const current = mapResponseData(response.data);

        const comparisonBefore = before.subtract(1, period as moment.unitOfTime.DurationConstructor);
        const comparisonAfter = after.subtract(1, period as moment.unitOfTime.DurationConstructor);

        const comparisonResponse = await api.get('/packages/strava/athlete/activities', requestData(comparisonBefore, comparisonAfter));

        if (comparisonResponse && comparisonResponse.data) {
          const comparison = mapResponseData(comparisonResponse.data);

          setStats( { current: current, comparison: comparison, done: true } );
        }
      }
    }

    if (stravaStore.accessToken && search) {
      fetchStats();
    }
  }, [stravaStore.accessToken, search, period]);

  return stats;
}
