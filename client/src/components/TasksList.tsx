import * as React from 'react';
import { Box, Flex } from './layout/'
import AddTaskForm from './AddTaskForm';
import { taskStore, modalStore, uiStore } from '../stores';
import TaskItem from './TaskItem';
import Icon from './Icon';
import { observer } from 'mobx-react';

interface ITaskListProps {
  tasks: Planner.Tasks.Task[],
  types: Planner.TaskTypes.Type[]
}

const FormToggle: React.StatelessComponent = ({}) => {
  const toggleForm = () => {
    uiStore.setShowTaskForm();
  }

  return(
    <Icon
      onClick={toggleForm}
      color="rgb(149, 195, 141, 0.75)"
      size="2x"
      icon={(!uiStore.showTaskForm) ? 'plus-circle' : 'minus-circle'}
    />
  );
}

const TasksList: React.StatelessComponent<ITaskListProps> = ({
  tasks,
  types
}) => {
  return (
    <Box>
      <Flex mb="20px" justifyContent="flex-end">
        <FormToggle />
      </Flex>

      <Box style={ (!uiStore.showTaskForm) ? { display: 'none' } : {}}>
        <AddTaskForm uiStore={uiStore} types={types} />
      </Box>

      { tasks.map((task, key) => {

        const deleteTask = async () => {
          if (task._id) {
            await taskStore.deleteTask(task._id);
          }
        }

        const editTask = async () => {
          if (task._id) {
            modalStore.setShowTaskModal(task._id);
          }
        }

        const trashIcon: Planner.Tasks.Icon = {
          icon: 'trash-alt',
          onClick: deleteTask
        }

        const EditIcon: Planner.Tasks.Icon = {
          icon: 'edit',
          onClick: editTask
        }

        return (
          <TaskItem types={types} task={task} key={key} icons={[ trashIcon, EditIcon ]} />
          )
        }) }
    </Box>
  )
}

export default observer(TasksList);
