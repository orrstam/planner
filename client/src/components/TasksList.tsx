import * as React from 'react';
import { Box } from './layout/'
import AddTaskForm from './AddTaskForm';
import TaskItem from './TaskItem';
import * as TaskStore from '../stores/TaskStore';

interface ITaskListProps {
  tasks: Planner.Tasks.Task[]
}

const TasksList: React.StatelessComponent<ITaskListProps> = ({
  tasks
}) => {

  const { taskStore } = TaskStore;

  return (
    <Box>
      <AddTaskForm />
      { tasks.map((task, key) => {

        const clickHandler = async () => {
          if (task._id) {
            const deleted = await taskStore.deleteTask(task._id);
            console.log('Deleted:', deleted);
          }
        }

        const trashIcon: Planner.Tasks.Icon = {
          icon: 'trash-alt',
          onClick: clickHandler
        }

        return (
          <TaskItem key={key} task={task} icons={[ trashIcon ]} />
        )
      }) }
    </Box>
  )
}

export default TasksList;
