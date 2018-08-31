import * as React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, FormikActions, FormikErrors } from 'formik';
import TaskStore from '../stores/TaskStore';
import { inject } from 'mobx-react';

const Wrapper = styled.div``;

export interface IAddTaskFormSubmitValues {
  title: string,
  text: string
}

export interface IAddTaskFormProps {
  taskStore?: TaskStore,
  onSubmit?: (e: IAddTaskFormSubmitValues) => Promise<any>,
}

@inject('taskStore')
export default class AddTaskForm extends React.Component<IAddTaskFormProps> {
  handleSubmit = async (
    data: IAddTaskFormSubmitValues,
    { setSubmitting, setErrors }: FormikActions<IAddTaskFormSubmitValues>
  ) => {
      setSubmitting(true);
      const response = await this.props.taskStore!.createTask(data);
      setSubmitting(false);

      if (response && response.error) {
        setErrors(response.error);
      }
  };

  validate(values: IAddTaskFormSubmitValues) {
    let errors: FormikErrors<any> = {};

    Object.keys(values).forEach(key => {
      if (!values[key]) {
      errors[key] = 'Required';
      }
    });

    return errors;
  }

  public render() {
    const initialValues: IAddTaskFormSubmitValues = {
      title: '',
      text: ''
    };

    return(
      <Wrapper>
        <Formik onSubmit={this.handleSubmit} initialValues={initialValues} validate={this.validate}>
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Field name="title">
              {({field, form}) => (
                <div>
                  <input type="text" {...field} placeholder="Title"/> { form.touched.title && form.errors.title }
                </div>
              )}
            </Field>
            <Field name="text">
              {({field, form}) => (
                <div>
                  <textarea {...field} rows={10} cols={40} placeholder="Text">{}</textarea>{ form.touched.text && form.errors.text }
                  {/* <input style={} type="textarea" {...field} placeholder="Text"/> { form.touched.text && form.errors.text } */}
                </div>
              )}
            </Field>
            <button type="submit">Submit</button>
          </Form>
        )}
        </Formik>
      </Wrapper>
    )
  }
}
