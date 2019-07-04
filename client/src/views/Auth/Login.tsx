import * as React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, FormikActions, FormikErrors } from 'formik';
import { Flex, Input, Button } from '../../components/layout';
import { UserStore, userStore } from '../../stores/';
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

const Login: React.FC<ILoginProps> = () => {
  const [redirectTo, setRedirectTo] = React.useState<string>();

  React.useEffect(() => {
    userStore.authenticate().then(user => {
      if (user) {
        setRedirectTo('/');
      }
    });
  }, []);

  const handleSubmit = async (
    data: Planner.Users.Forms.RegisterValues,
    {
      setSubmitting,
      setErrors,
      resetForm
    }: FormikActions<Planner.Users.Forms.RegisterValues>
  ) => {
    setSubmitting(true);

    try {
      const response = await userStore.login(data);
      if (response.status && response.status === 200) {
        setSubmitting(false);
        resetForm();
        setRedirectTo('/');
      } else {
        setErrors(response.message);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const validate = (values: Planner.Users.Forms.SubmitValues) => {
    let errors: FormikErrors<any> = {};

    Object.keys(values).forEach(key => {
      if (!values[key]) {
        errors[key] = 'Required';
      }
    });

    return errors;
  };

  if (redirectTo && typeof redirectTo === 'string') {
    return <Redirect to={redirectTo} />;
  }

  return (
    <Flex justifyContent='center'>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{ username: 'orrstam@itiden.se', password: '' }}
        validate={validate}
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
};

export default Login;
