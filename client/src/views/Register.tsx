import * as React from 'react';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import { Formik, Form, Field, FormikErrors, FormikActions } from 'formik';
import { Flex, Input, Button } from '../components/layout/';
import { UserStore } from '../stores';

const InputWrap = styled.div`
  margin-bottom: 15px;
`;

const ErrorMessage = styled.div`
  margin-top: 5px;
  color: #ad5b5b;
`;

interface IRegisterProps {
  userStore: UserStore;
}

@inject('userStore')
export default class Register extends React.Component<IRegisterProps> {
  handleSubmit = async (
    data: Planner.Users.Forms.RegisterValues,
    {
      setSubmitting,
      setErrors,
      resetForm
    }: FormikActions<Planner.Users.Forms.RegisterValues>
  ) => {
    setSubmitting(true);

    const response = await this.props.userStore.register(data);

    if (response && response.error) {
      setErrors(response.message);
    } else {
      resetForm();
      window.location.href = 'http://localhost:3000/dashboard';
    }

    setSubmitting(false);
  };

  validate(values: Planner.Users.Forms.RegisterValues) {
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
      <Flex justifyContent='center' flexDirection='row' width='100vw'>
        <Formik
          onSubmit={this.handleSubmit}
          initialValues={{ username: 'user@itiden.se', password: '222' }}
          validate={this.validate}
        >
          {form => (
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
                    <ErrorMessage>
                      {form.touched.password && form.errors.password}
                    </ErrorMessage>
                  </InputWrap>
                )}
              </Field>
              <Button type='submit'>Let me join!</Button>
              <ErrorMessage>
                {Object.keys(form.errors).length ? form.errors : null}
              </ErrorMessage>
            </Form>
          )}
        </Formik>
      </Flex>
    );
  }
}
