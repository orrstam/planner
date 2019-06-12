import * as React from 'react';
import { FormikActions, FormikErrors } from 'formik';
import { inject } from 'mobx-react';
import { TaskStore, UIStore, UserStore } from '../stores/';
import TaskForm from '../components/TaskForm';
import helpers from '../services/helpers';
import { Box } from './layout';
import FormSuccess from './FormSuccess';
export interface IAddTaskFormProps {
  taskStore?: TaskStore;
  userStore?: UserStore;
  uiStore: UIStore;
  types: Planner.TaskTypes.Type[];
}

@inject('taskStore', 'userStore')
export default class AddTaskForm extends React.Component<IAddTaskFormProps> {
  handleSubmit = async (
    data: Planner.Tasks.Forms.SubmitValues,
    {
      setSubmitting,
      setErrors,
      resetForm
    }: FormikActions<Planner.Tasks.Forms.SubmitValues>
  ) => {
    setSubmitting(true);

    Object.assign(data, {
      types: data.types.value,
      users: this.props.userStore!.activeUser
    });

    try {
      const response = await this.props.taskStore!.createTask(data);

      if (response && response.error) {
        setErrors(response.error);
      } else {
        this.props.uiStore.setFormSuccess();
        resetForm();
      }
    } catch (error) {
      // Handle error
      console.log('AddTaskForm Error: ', error);
    }

    this.props.uiStore.setShowTaskForm();
    setSubmitting(false);

    setTimeout(() => {
      this.props.uiStore.setFormSuccess();
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

  public render() {
    const initialValues: Planner.Tasks.Forms.SubmitValues = {
      title: '',
      text: '',
      types: []
    };

    return (
      <Box>
        <FormSuccess formSuccess={this.props.uiStore.formSuccess} />
        <TaskForm
          initialValues={initialValues}
          handleSubmit={this.handleSubmit}
          validate={this.validate}
          types={helpers.getOptionsFromTypes(this.props.types)}
        />
      </Box>
    );
  }
}
