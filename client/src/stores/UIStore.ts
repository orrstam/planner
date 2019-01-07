import { observable, action } from 'mobx';

export default class UIStore {
  @observable showTaskForm: boolean = false;
  @observable formSuccess: boolean = false;

  @action
  setShowTaskForm() {
    this.showTaskForm = !this.showTaskForm;
  }

  @action
  setFormSuccess() {
    this.formSuccess = !this.formSuccess;
  }
}

export const uiStore = new UIStore();
