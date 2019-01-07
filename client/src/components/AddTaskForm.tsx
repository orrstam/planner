import * as React from 'react';
import { FormikActions, FormikErrors } from 'formik';
import { inject } from 'mobx-react';
import { TaskStore, UIStore } from '../stores/';
import TaskForm from '../components/TaskForm';
import helpers from '../services/helpers';
import { Box } from './layout';
import FormSuccess from './FormSuccess';

export interface IAddTaskFormProps {
  taskStore?: TaskStore,
  uiStore: UIStore,
  types: Planner.TaskTypes.Type[],
}

@inject('taskStore')
export default class AddTaskForm extends React.Component<IAddTaskFormProps> {
  handleSubmit = async (
    data: Planner.Tasks.Forms.SubmitValues,
    { setSubmitting, setErrors, resetForm }: FormikActions<Planner.Tasks.Forms.SubmitValues>
    ) => {
      setSubmitting(true);

      // Only send type id to api
      data.types = data.types.value;

      const response = await this.props.taskStore!.createTask(data);

      if (response && response.error) {
        setErrors(response.error);
      } else {
        this.props.uiStore.setFormSuccess();
        resetForm();
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
    )
  }
}
