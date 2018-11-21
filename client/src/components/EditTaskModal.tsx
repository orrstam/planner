import * as React from 'react';
import { FormikActions, FormikErrors } from 'formik';
import Modal from '../components/Modal'
import { Box } from './layout';
import TaskForm from '../components/TaskForm';
import { modalStore, taskStore } from '../stores';
import { observer } from 'mobx-react';

interface IEditTaskModalProps {
  task: Planner.Tasks.Task,
}

@observer
export default class EditTaskModal extends React.Component<IEditTaskModalProps> {
  handleSubmit = async (
    data: Planner.Tasks.Forms.SubmitValues,
    { setSubmitting, setErrors, resetForm }: FormikActions<Planner.Tasks.Forms.SubmitValues>
  ) => {
      setSubmitting(true);
      const response = await taskStore.updateTask(data);

      if (response && response.error) {
        setErrors(response.error);
      } else {
        resetForm();
      }

      setSubmitting(false);
  };

  validate(values: Planner.Tasks.Forms.SubmitValues) {
    let errors: FormikErrors<any> = {};

    Object.keys(values).forEach(key => {
      if (!values[key]) {
        errors[key] = 'Required';
      }
    });

    return errors;
  }

  clickHandler = () => {
    modalStore.setShowTaskModal('');
  }

  render() {
    const { task } = this.props;

    return (
      <Modal close={this.clickHandler} show={modalStore.showTaskModal == task._id} heading="Edit task">
        <Box mb="25px">
          <TaskForm initialValues={{title: task.title, text: task.text, _id: task._id}} handleSubmit={this.handleSubmit} validate={this.validate} edit={true} />
        </Box>
      </Modal>
    )
  }
}