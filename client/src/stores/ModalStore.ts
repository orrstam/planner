import { observable, action } from 'mobx';

export default class ModalStore {
  @observable showTaskModal: string = '';

  @action
  setShowTaskModal(id: string = '') {
    this.showTaskModal = id;
  }
}

export const modalStore = new ModalStore();
