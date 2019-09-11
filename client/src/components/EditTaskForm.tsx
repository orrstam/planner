import * as React from 'react';
import { Formik, Form, Field, FormikActions } from 'formik';
import { taskStore } from '../stores';
import styled from 'styled-components';
import * as Yup from 'yup';
import theme from '../config/theme';
import { Flex, Box, Input, Button } from './layout';
import Icon from './Icon';

const editTaskFormValidation = Yup.object().shape({
  title: Yup.string()
    .max(50, 'Title too long!')
    .required('Required'),
  text: Yup.string().required('Required')
});

interface IAction {
  type: 'expanded' | 'editable';
}

interface IEditTaskForm {
  task: Planner.Tasks.Task;
  types: Planner.TaskTypes.Type[];
  dispatch(action: IAction): void;
}

const ErrorMessage = styled.div`
  margin-top: 5px;
  color: #ad5b5b;
`;

const Textarea = styled.textarea`
  font-size: 16px;
  width: 100%;
  border: none;
  border-bottom: 1px solid #ccc;
`;

const EditTaskForm: React.FC<IEditTaskForm> = (props: IEditTaskForm) => {
  const { task, dispatch } = props;
  const [formSuccess, setFormSuccess] = React.useState<boolean>(false);

  return (
    <Box>
      <Box p="0 30px">
        <Formik
          validationSchema={editTaskFormValidation}
          onSubmit={async (
            data: Planner.Tasks.Forms.SubmitValues,
            actions: FormikActions<Planner.Tasks.Forms.SubmitValues>
          ) => {
            actions.setSubmitting(true);

            const response = await taskStore.updateTask(data);

            if (response && response.data && response.status === 200) {
              actions.resetForm();
              setFormSuccess(true);
            } else {
              actions.setErrors(response.error);
            }

            actions.setSubmitting(false);

            setTimeout(() => {
              dispatch({ type: 'editable' });
            }, 1500);
          }}
          initialValues={{
            _id: task._id,
            title: task.title,
            text: task.text,
            goal: task.goal
          }}
        >
          {form => (
            <Form>
              <Box color="#333">
                <h4
                  style={{
                    fontSize: '18px',
                    color: 'red'
                  }}
                >
                  <Field name="title">
                    {({ field, form }) => (
                      <>
                        <Input
                          {...field}
                          edit={true}
                          pb="7.5px"
                          fontSize="18px"
                          width="100%"
                          type="text"
                          placeholder="Title"
                        />
                        <ErrorMessage>
                          {form.touched.title && form.errors.title}
                        </ErrorMessage>
                      </>
                    )}
                  </Field>
                </h4>
                <Box m="20px 0">
                  <Field name="text">
                    {({ field, form }) => (
                      <>
                        <Textarea
                          {...field}
                          rows={4}
                          cols={40}
                          placeholder="Text"
                        >
                          {}
                        </Textarea>
                        <ErrorMessage>
                          {form.touched.text && form.errors.text}
                        </ErrorMessage>
                      </>
                    )}
                  </Field>
                </Box>
                {task.goal ? (
                  <Box>
                    Run{' '}
                    <Field name="goal">
                      {({ form, field }) => (
                        <>
                          <Input
                            onChange={(e: any) => {
                              form.setFieldValue('goal', e.target.value);
                            }}
                            type="number"
                            fontSize="16px"
                            color={`rgb(${theme.colors.Exercise})`}
                            width="60px"
                            edit={true}
                            placeholder="Set Goal (km)"
                            {...field}
                          />{' '}
                          km this {task.period}
                          <ErrorMessage>
                            {form.touched.goal && form.errors.goal}
                          </ErrorMessage>
                        </>
                      )}
                    </Field>
                  </Box>
                ) : null}
              </Box>
              <Flex>
                <Button
                  bg="#464646"
                  width="100px"
                  type="submit"
                  disabled={form.isSubmitting}
                  p="7.5px 12px"
                >
                  {formSuccess ? (
                    <Icon icon="check" color="#fff" size="1x" />
                  ) : (
                    'Save'
                  )}
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export { EditTaskForm };
