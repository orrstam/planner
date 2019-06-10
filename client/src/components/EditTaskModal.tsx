import * as React from 'react';
import { FormikActions, FormikErrors } from 'formik';
import { modalStore, taskStore, uiStore } from '../stores';
import { observer } from 'mobx-react';
import Modal from '../components/Modal';
import TaskForm from '../components/TaskForm';
import helpers from '../services/helpers';
import { Box } from './layout';
import FormSuccess from './FormSuccess';

interface IEditTaskModalProps {
  task: Planner.Tasks.Task;
  types: Planner.TaskTypes.Type[];
}

@observer
export default class EditTaskModal extends React.Component<
  IEditTaskModalProps
> {
  handleSubmit = async (
    data: Planner.Tasks.Forms.SubmitValues,
    {
      setSubmitting,
      setErrors,
      resetForm
    }: FormikActions<Planner.Tasks.Forms.SubmitValues>
  ) => {
    setSubmitting(true);

    // Only send type id to api
    data.types = data.types.value;

    const response = await taskStore.updateTask(data);

    if (response && response.error) {
      setErrors(response.error);
    } else {
      resetForm();
      uiStore.setFormSuccess();
    }

    setSubmitting(false);

    modalStore.setShowTaskModal('');
    taskStore.filters = [];
    setTimeout(() => {
      uiStore.setFormSuccess();
    }, 2000);
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
  };

  render() {
    const { task } = this.props;

    return (
      <Box>
        <FormSuccess formSuccess={uiStore.formSuccess} />
        <Modal
          close={this.clickHandler}
          show={modalStore.showTaskModal == task._id}
          heading='Edit task'
        >
          <Box mb='25px'>
            <TaskForm
              initialValues={{
                title: task.title,
                text: task.text,
                _id: task._id,
                types: [{ value: task.types[0]._id, label: task.types[0].name }]
              }}
              handleSubmit={this.handleSubmit}
              validate={this.validate}
              types={helpers.getOptionsFromTypes(this.props.types)}
            />
          </Box>
        </Modal>
      </Box>
    );
  }
}
