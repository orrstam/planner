import * as React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, FormikActions, FormikErrors } from 'formik';
import { inject } from 'mobx-react';
import { Flex, Input, Button } from '../../components/layout';
import { UserStore } from '../../stores/';

const InputWrap = styled.div`
  margin-bottom: 15px;
`;

interface ILoginProps {
  userStore: UserStore;
  redirect: boolean;
}

const ErrorMessage = styled.div`
  margin-top: 5px;
  color: #ad5b5b;
`;

@inject('userStore')
export default class Login extends React.Component<ILoginProps> {
  handleSubmit = async (
    data: Planner.Users.Forms.RegisterValues,
    {
      setSubmitting,
      setErrors,
      resetForm
    }: FormikActions<Planner.Users.Forms.RegisterValues>
  ) => {
    setSubmitting(true);

    const response = await this.props.userStore.login(data);

    if (response && response.error) {
      setErrors(response.message);
    } else {
      resetForm();
      // window.location.href = 'http://localhost:3000/dashboard';
    }

    setSubmitting(false);
  };

  validate(values: Planner.Users.Forms.SubmitValues) {
    let errors: FormikErrors<any> = {};

    Object.keys(values).forEach(key => {
      if (!values[key]) {
        errors[key] = 'Required';
      }
    });

    return errors;
  }

  public render() {
    return (
      <Flex justifyContent='center' width='100vw'>
        <Formik
          onSubmit={this.handleSubmit}
          initialValues={{ username: '', password: '' }}
          validate={this.validate}
        >
          <Form style={{ width: '60%', alignSelf: 'center' }}>
            <Field name='username'>
              {({ field, form }) => (
                <InputWrap>
                  <Input
                    type='email'
                    {...field}
                    placeholder='Email'
                    width='100%'
                  />
                  <ErrorMessage>
                    {form.touched.username && form.errors.username}
                  </ErrorMessage>
                </InputWrap>
              )}
            </Field>
            <Field name='password'>
              {({ field, form }) => (
                <InputWrap>
                  <Input
                    type='password'
                    {...field}
                    placeholder='Password'
                    width='100%'
                  />
                  {form.errors && form.errors.length ? (
                    <ErrorMessage>{form.errors}</ErrorMessage>
                  ) : null}
                  <ErrorMessage>
                    {form.touched.password && form.errors.password}
                  </ErrorMessage>
                </InputWrap>
              )}
            </Field>
            <Button type='submit'>Login</Button>
          </Form>
        </Formik>
      </Flex>
    );
  }
}
