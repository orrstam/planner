import * as React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Formik, Form, Field, FormikActions } from 'formik';
import { Flex, Input, Button } from '../components/layout/';
import { userStore } from '../stores';

const registerFormValidation = Yup.object().shape({
  username: Yup.string()
    .email()
    .required('Required'),
  password: Yup.string()
    .required('Requried')
});

const InputWrap = styled.div`
  margin-bottom: 15px;
`;

const ErrorMessage = styled.div`
  margin-top: 5px;
  color: #ad5b5b;
`;

const Register: React.FC = () => {
  const handleSubmit = async (
    data: Planner.Users.Forms.RegisterValues,
    {
      setSubmitting,
      setErrors,
      resetForm
    }: FormikActions<Planner.Users.Forms.RegisterValues>
  ) => {
    setSubmitting(true);
    console.log('Register data: ', data);
    console.log(userStore)
    const response = await userStore.register(data);

    if (response && response.error) {
      setErrors(response.message);
    } else {
      resetForm();
      window.location.href = 'http://localhost:3000/';
    }

    setSubmitting(false);
  };

  return (
    <Flex justifyContent="center" flexDirection="row" width="100vw">
      <Formik
        onSubmit={handleSubmit}
        initialValues={{ username: '', password: '' }}
        validationSchema={registerFormValidation}
      >
        <Form style={{ width: '60%', alignSelf: 'center' }}>
          <Field name="username">
            {({ form, field }) => (
              <InputWrap>
                <Input {...field} type="email" placeholder="Email" width="100%" />
                <ErrorMessage>
                  {form.touched.username && form.errors.username}
                </ErrorMessage>
              </InputWrap>
            )}
          </Field>
          <Field name="password">
            {({ form, field }) => (
              <InputWrap>
                <Input {...field} type="password" placeholder="Password" width="100%" />
                <ErrorMessage>
                  {form.touched.password && form.errors.password}
                </ErrorMessage>
              </InputWrap>
            )}
          </Field>
          <Button p="15px 0" type="submit">
            Let me join!
          </Button>
          <ErrorMessage>
            {/* {Object.keys(form.errors).length ? form.errors : null} */}
          </ErrorMessage>
        </Form>
      </Formik>
    </Flex>
  );
};

export default Register;