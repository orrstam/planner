import * as React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, FormikActions, FormikErrors } from 'formik';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { Flex, Input, Button } from '../../components/layout';
import { UserStore } from '../../stores/';
import { Redirect } from 'react-router';

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
@observer
export default class Login extends React.Component<ILoginProps> {
  @observable redirect: boolean = false;

  @action
  setRedirect(value: boolean): void {
    this.redirect = value;
  }

  handleSubmit = async (
    data: Planner.Users.Forms.RegisterValues,
    {
      setSubmitting,
      setErrors,
      resetForm
    }: FormikActions<Planner.Users.Forms.RegisterValues>
  ) => {
    setSubmitting(true);

    try {
      const response = await this.props.userStore.login(data);

      if (response.status && response.status === 200) {
        resetForm();
        this.setRedirect(true);
      } else {
        setErrors(response.message);
      }
    } catch (error) {
      console.log('error: ', error);
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
    if (this.redirect) {
      return <Redirect to='/dashboard' />;
    }

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
