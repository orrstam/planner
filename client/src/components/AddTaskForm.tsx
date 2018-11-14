import * as React from 'react';
import { FormikActions, FormikErrors } from 'formik';
import TaskStore from '../stores/TaskStore';
import { inject } from 'mobx-react';
import TaskForm from '../components/TaskForm';

export interface IAddTaskFormProps {
  taskStore?: TaskStore,
}

@inject('taskStore')
export default class AddTaskForm extends React.Component<IAddTaskFormProps> {
  handleSubmit = async (
    data: Planner.Tasks.Forms.SubmitValues,
    { setSubmitting, setErrors, resetForm }: FormikActions<Planner.Tasks.Forms.SubmitValues>
  ) => {
      setSubmitting(true);
      const response = await this.props.taskStore!.createTask(data);

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

  public render() {
    const initialValues: Planner.Tasks.Forms.SubmitValues = {
      title: '',
      text: ''
    };

    return (
      <TaskForm initialValues={initialValues} handleSubmit={this.handleSubmit} validate={this.validate} />
    )
  }
}
