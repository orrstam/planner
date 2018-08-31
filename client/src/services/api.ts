import axios from 'axios';
import * as moment from 'moment';

const api = axios.create({
  baseURL: 'http://localhost:7778/api/v1',
});

function getWeek(date: moment.Moment): number {
  return moment(date).isoWeek();
}

export default api;
export { getWeek }