import * as React from 'react';
import { getPeriodDates, distanceToKm } from '../services/helpers';
import { TaskStore, typeStore, stravaStore } from '../stores';

interface IGoalItem {
  period: string;
  current: {
    distance: number;
  },
  goal: {
    distance: number;
  }
}

async function getPeriodDistance(before: any, after: any) {
  const periodActivities = await stravaStore.getActivitiesByDates(before, after);
  let distance: number = 0;

  periodActivities.map((activity: Planner.Strava.Activity) => {
    distance = distance + distanceToKm(activity.distance);
  });

  return distance;
}

export function useExerciseGoals() {
  const [goals, setGoals] = React.useState<IGoalItem[]>();

  React.useEffect(() => {
    async function fetchGoals() {
      try {
        const taskStore = new TaskStore();

        await taskStore.fetch();

        const type = typeStore.getByLabel('Exercise');

        if (type) {
          taskStore.filters = [type];
        }
    
        taskStore.filter();

        const res = taskStore.filteredTaskList.map(async task => {
          const dates = getPeriodDates(task.period as string);
          const periodDistance = await getPeriodDistance(dates.before, dates.after);

          return {
            period: task.period as string,
            current: {
              distance: periodDistance,
            },
            goal: {
              distance: task.goal ? task.goal : 0,
            }
          }
        });

        Promise.all(res).then((completed) => {
          setGoals(completed);
        });

      } catch (error) {
        // Handle error
      }
    }

    fetchGoals();
  }, []);

  return goals;
}
