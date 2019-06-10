import axios from 'axios';
import * as moment from 'moment';

const api = axios.create({
  baseURL: 'http://localhost:7778/api/v1'
  // validateStatus: (status): any => { return true; }
});

function getWeek(date: moment.Moment): number {
  return moment(date).isoWeek();
}

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Handle token expired
      console.log(
        `Error API, message: ${error.response.data.message} status: ${
          error.response.status
        }`
      );
    }

    return error.response;
  }
);

function getToken(): string | null {
  return localStorage.getItem('token');
}

function setToken(token: string): void {
  localStorage.setItem('token', token);
}

export default api;
export { getWeek, getToken, setToken };
