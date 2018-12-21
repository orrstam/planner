import { observable } from 'mobx';
import api from '../services/api';

export default class TypeStore {
  @observable types: Planner.TaskTypes.Type[] = [];

  async fetch(): Promise<any> {
    try {
      const data = await api.get('types');
      this.types = data.data;

    } catch(error) {
      return Promise.reject(error);
    }
  }
}

export const typeStore = new TypeStore();
