import * as React from 'react';
import { Box } from '../components/layout';
import { Formik, Form, Field, FormikErrors } from 'formik';
import styled from 'styled-components';

const InputWrap = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  padding-left: 5px;
  font-size: 14px;
  width: 100%;
`;

const Textarea = styled.textarea`
  padding-left: 5px;
  font-size: 14px;
  width: 100%;
`;

const Button = styled.button`
  border: 1px solid #ccc;
  padding: 10px 15px;
  border-radius: 0;
`;

interface ITaskFormProps {
  handleSubmit: (data: Planner.Tasks.Forms.SubmitValues, {}) => Promise<void>,
  initialValues: Planner.Tasks.Forms.SubmitValues,
  validate: (values: Planner.Tasks.Forms.SubmitValues) => FormikErrors<any>,
  edit?: boolean
}

const TasksForm: React.StatelessComponent<ITaskFormProps> = ({
  handleSubmit,
  initialValues,
  validate,
  edit
}) => {

  return (
    <Box mb="25px">
    <Formik onSubmit={handleSubmit} initialValues={initialValues} validate={validate}>
    {({ handleSubmit, isSubmitting }) => (
      <Form onSubmit={handleSubmit}>
        <Field name="title">
          {({field, form}) => (
            <InputWrap>
              <Input type="text" {...field} placeholder="Title"/> { form.touched.title && form.errors.title }
            </InputWrap>
          )}
        </Field>
        <Field name="text">
          {({field, form}) => (
            <InputWrap>
              <Textarea {...field} rows={10} cols={40} placeholder="Text">{}</Textarea>{ form.touched.text && form.errors.text }
            </InputWrap>
          )}
        </Field>
        <Button disabled={isSubmitting}>Save</Button>
      </Form>
    )}
    </Formik>
  </Box>
  )
}

export default TasksForm;
