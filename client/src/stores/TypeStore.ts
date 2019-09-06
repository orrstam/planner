import { observable } from 'mobx';
import api from '../services/api';
import { AxiosResponse } from 'axios';

export default class TypeStore {
  @observable types: Planner.TaskTypes.Type[] = [];

  getByLabel(label: string): Planner.Tasks.Forms.Option | void {
    const type = this.types.filter(type => type.name == label);

    if (type.length) {
      return {
        value: type[0]._id,
        label: type[0].name
      };
    }
  }

  async fetch(): Promise<any> {
    try {
      const data: AxiosResponse = await api.get('types');

      if (data.status !== 200) {
        throw data;
      }

      this.types = data.data;
    } catch (error) {
      return error;
    }
  }
}

export const typeStore = new TypeStore();

