import { action, observable } from 'mobx';
import api, { getToken, setToken } from '../services/api';

export default class UserStore {
  @observable activeUser: string = '';

  @action
  setActiveUser(id: string) {
    this.activeUser = id;
  }

  @action
  async authenticate(): Promise<any> {
    if (getToken()) {
      const response = await api.get('/users/user', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });

      if (response.status === 200) {
        this.setActiveUser(response.data._id);
        return response;
      }
    }
  }

  async register(data: Planner.Users.Forms.RegisterValues): Promise<any> {
    try {
      const user = await api.post('/users/register', data);

      if (user.status !== 200) {
        throw user.data;
      }

      setToken(user.data.token);

      return user;
    } catch (error) {
      return error;
    }
  }

  async login(data: Planner.Users.Forms.RegisterValues): Promise<any> {
    try {
      const response = await api.post('/users/login', data);

      if (response.status !== 200) {
        throw response.data;
      }

      setToken(response.data.token);

      return response;
    } catch (error) {
      return error;
    }
  }
}

export const userStore = new UserStore();
