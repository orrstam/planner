import * as React from 'react';
import { Formik, Form, Field, FormikErrors, FormikProps, FieldProps } from 'formik';
import styled from 'styled-components';
import Select from 'react-select';
import { Box, Input } from '../components/layout';

const InputWrap = styled.div`
  margin-bottom: 15px;
`;

const Textarea = styled.textarea`
  padding: 15px;
  font-size: 16px;
  width: 100%;
  box-shadow: 1px 4px 15px -2px #ccc;
  border: none;
`;

const Button = styled.button`
  border: 1px solid #ccc;
  padding: 10px 25px;
  border-radius: 0;
  margin-top: 15px;
  border: none;
  box-shadow: 1px 4px 15px -2px #ccc;
  font-size: 16px;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  margin-top: 5px;
  color: #ad5b5b;
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
              <Input width="100%" type="text" {...field} placeholder="Title"/>
              <ErrorMessage>{ form.touched.title && form.errors.title }</ErrorMessage>
            </InputWrap>
          )}
        </Field>
        <Field name="text">
          {({field, form}) => (
            <InputWrap>
              <Textarea {...field} rows={10} cols={40} placeholder="Text">{}</Textarea>
              <ErrorMessage>{ form.touched.text && form.errors.text }</ErrorMessage>
            </InputWrap>
          )}
        </Field>
        <Field name="types">
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
  handleChange = (e: Planner.Tasks.Forms.Option): void => {
    this.props.form.setFieldValue('types', e);
  }

  customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      color: state.isSelected ? 'rgba(149, 195, 141, 0.75)' : '#333',
      backgroundColor: state.isSelected ? '#fff' : '#fff'
    }),
    control: (base: any, state: any) => ({
      ...base,
      padding: 5,
      boxShadow: '1px 4px 15px -2px #ccc',
      border: 'none'
    })
  };

  render() {
    const { options, field } = this.props;

    return (
      <Select
        onChange={this.handleChange}
        options={ options }
        value={field.value}
        placeholder="Select"
        styles={this.customStyles}
      />
    )
  }
}

export default TaskForm;
