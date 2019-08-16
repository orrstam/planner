import * as moment from 'moment';

const helpers = {
  getOptionsFromTypes: (
    types: Array<Planner.TaskTypes.Type>
  ): Array<Planner.Tasks.Forms.Option> => {
    let options: any = [];

    types.map((type, index) => {
      options[index] = {
        value: type._id,
        label: type.name
      };
    });

    return options;
  }
};

function distanceToKm(meters: number): number {
  return (meters / 1000);
}

function secondsTimeObject(seconds: number): {hours: number, minutes: number} {
  const hours = Math.floor(seconds / 3600);
  const minutes = ((seconds - hours * 3600) / 60);

  return {
    hours: hours,
    minutes: minutes
  }
}

function secondsToMinutes(seconds: number): string {
  return (seconds / 60).toFixed(6);
}

function getPeriodDates(period: string) {
  return {
    before: moment().endOf(period as moment.unitOfTime.StartOf),
    after: moment().endOf(period as moment.unitOfTime.StartOf).subtract(1, period as moment.unitOfTime.DurationConstructor)
  }
}

export default helpers;
export { distanceToKm, secondsTimeObject, secondsToMinutes, getPeriodDates };
