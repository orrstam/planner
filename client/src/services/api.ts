import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:7778/api/v1',
});

export default api;