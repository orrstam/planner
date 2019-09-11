import * as React from 'react';
import { Box, Flex } from './layout/';
import TaskType from './TaskType';
import { taskStore } from '../stores';
import { EditTaskForm } from './EditTaskForm';
import theme from '../config/theme';
import Icon from './Icon';
import { Span } from './Span';

const componentState = {
  expanded: false,
  editable: false
};

type ComponentState = typeof componentState;

interface IAction {
  type: 'expanded' | 'editable';
}

interface ITaskProps {
  task: Planner.Tasks.Task;
  types?: Planner.TaskTypes.Type[];
}

function reducer(state: ComponentState, action: IAction): ComponentState {
  switch (action.type) {
    case 'expanded':
      return {
        expanded: state.expanded ? false : true,
        editable: state.editable
      };
    case 'editable':
      return {
        expanded: state.expanded,
        editable: state.editable ? false : true
      };
    default:
      throw new Error();
  }
}

const TaskItem: React.StatelessComponent<ITaskProps> = ({ task, types }) => {
  const [state, dispatch] = React.useReducer(reducer, componentState);
  const icons = [
    {
      icon: 'trash-alt',
      onClick: async () => {
        if (task._id) {
          await taskStore.deleteTask(task._id);
          dispatch({ type: 'expanded' });
        }
      }
    },
    {
      icon: 'edit',
      onClick: async () => {
        if (task._id) {
          dispatch({ type: 'editable' });
        }
      }
    }
  ];

  return (
    <Box
      p="15px 10px"
      mb="25px"
      bg="#fff"
      width="100%"
      boxShadow="1px 4px 15px -2px #ccc;"
    >
      {task.types
        ? task.types.map((type: any, key: number) => {
            return <TaskType type={type} key={key} />;
          })
        : null}

      {state.expanded ? (
        <>
          <Flex>
            <Flex
              mb="10px"
              justifyContent="flex-end"
              justifySelf="flex-end"
              style={{ flex: 1 }}
            >
              {icons.map((icon: any, key: number) => {
                return (
                  <Icon
                    color="#7f7f7f"
                    onClick={icon.onClick}
                    key={key}
                    icon={icon.icon}
                    space="0 0 0 8px"
                  />
                );
              })}
              <Box ml="20px">
                <Icon
                  onClick={() => {
                    dispatch({ type: 'expanded' });
                  }}
                  color="#7f7f7f"
                  icon={'angle-up'}
                  size="1x"
                />
              </Box>
            </Flex>
          </Flex>
          {state.editable ? (
            types && (
              <EditTaskForm task={task} types={types} dispatch={dispatch} />
            )
          ) : (
            <Box color="#333" pl="30px">
              <h4
                style={{
                  fontSize: '18px'
                }}
              >
                {task.title}
              </h4>
              <Box
                pl="5px"
                borderLeft={`3px solid rgba(${
                  theme.colors[task.types[0].name]
                })`}
                m="20px 0"
              >
                {task.text}
              </Box>
              {task.goal ? (
                <Box>
                  Run{' '}
                  <Span color={`rgb(${theme.colors.Exercise})`}>
                    {task.goal}km
                  </Span>{' '}
                  this {task.period}
                </Box>
              ) : null}
            </Box>
          )}
        </>
      ) : (
        <Flex
          alignItems="center"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            dispatch({ type: 'expanded' });
          }}
        >
          <Flex style={{ flex: 1 }} pl="30px">
            <h4
              style={{
                color: '#333'
              }}
            >
              {task.title}
            </h4>
          </Flex>
          <Flex>
            <Icon color="#7f7f7f" icon={'angle-down'} size="1x" />
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default TaskItem;
