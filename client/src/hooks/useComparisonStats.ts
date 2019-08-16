import * as React from 'react';
import * as moment from 'moment';
import { distanceToKm, secondsToMinutes, getPeriodDates } from '../services/helpers';
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

  const currentDates = getPeriodDates(period as string);

  React.useEffect(() => {
    async function fetchStats() {
      const response = await stravaStore.getActivitiesByDates(currentDates.before, currentDates.after);

      if (response) {
        const current = mapResponseData(response);

        const comparisonBefore = currentDates.before.subtract(1, period as moment.unitOfTime.DurationConstructor);
        const comparisonAfter = currentDates.after.subtract(1, period as moment.unitOfTime.DurationConstructor);

        const comparisonResponse = await stravaStore.getActivitiesByDates(comparisonBefore, comparisonAfter);

        if (comparisonResponse) {
          const comparison = mapResponseData(comparisonResponse);

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
