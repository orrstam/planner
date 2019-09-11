import * as React from 'react';
import { Box } from './layout/'
import AddTaskForm from './AddTaskForm';
import { uiStore } from '../stores';
import TaskItem from './TaskItem';
import FormSuccess from './FormSuccess';
import { observer } from 'mobx-react';

interface ITaskListProps {
  tasks: Planner.Tasks.Task[],
  types: Planner.TaskTypes.Type[]
}

const TasksList: React.StatelessComponent<ITaskListProps> = ({
  tasks,
  types
}) => {
  return (
    <Box>
      <FormSuccess formSuccess={uiStore.formSuccess} />
      <Box style={ (!uiStore.showTaskForm) ? { display: 'none' } : {}}>
        <AddTaskForm uiStore={uiStore} types={types} />
      </Box>

      { tasks.map((task, key) => {
        return (
          <TaskItem types={types} task={task} key={key} />
          )
        }) }
    </Box>
  )
}

export default observer(TasksList);
