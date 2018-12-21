import * as React from 'react';
import { Box } from '../components/layout';
import { Formik, Form, Field, FormikErrors, FormikProps, FieldProps } from 'formik';
import styled from 'styled-components';
import Select from 'react-select';

const InputWrap = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  padding: 10px 5px;
  font-size: 14px;
  width: 100%;
`;

const Textarea = styled.textarea`
  padding: 10px 5px;
  font-size: 14px;
  width: 100%;
  border-color: #ccc;
`;

const Button = styled.button`
  border: 1px solid #ccc;
  padding: 10px 15px;
  border-radius: 0;
  margin-top: 15px;
`;

interface ITaskFormProps {
  handleSubmit: (data: Planner.Tasks.Forms.SubmitValues, {}) => Promise<void>,
  initialValues: Planner.Tasks.Forms.SubmitValues,
  validate: (values: Planner.Tasks.Forms.SubmitValues) => FormikErrors<any>,
  types?: Planner.Tasks.Forms.Option[]
}

const TaskForm: React.StatelessComponent<ITaskFormProps> = ({
  handleSubmit,
  initialValues,
  validate,
  types
}) => {
  return (
    <Box mb="25px" mt="25px">
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
        <Field name="option">
          {({field, form}: FieldProps<Planner.Tasks.Forms.Option>) => (
            <div>
              <MySelect {...field} field={field} form={form} options={types} />
            </div>
          )}
        </Field>
        <Button type="submit" disabled={isSubmitting}>Save</Button>
      </Form>
    )}
    </Formik>
  </Box>
  )
}

interface IMSelectProps {
  options?: Planner.Tasks.Forms.Option[],
  field: any,
  form: FormikProps<object>
}

class MySelect extends React.Component<IMSelectProps> {
  handleChange = (e: Object): void => {
    this.props.form.setFieldValue('option', e);
  }
  render() {
    const { options, field } = this.props;

    return (
      <Select
        onChange={this.handleChange}
        options={ options }
        value={field.value}
        placeholder="Select"
      />
    )
  }
}

export default TaskForm;
