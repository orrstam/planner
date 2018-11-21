import * as React from 'react';
import { Box } from './layout/'
import AddTaskForm from './AddTaskForm';
import { taskStore, modalStore } from '../stores';
import TaskItem from './TaskItem';

interface ITaskListProps {
  tasks: Planner.Tasks.Task[]
}

const TasksList: React.StatelessComponent<ITaskListProps> = ({
  tasks
}) => {

  return (
    <Box>
      <AddTaskForm />
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
          <TaskItem task={task} key={key} icons={[ trashIcon, EditIcon ]} />
          )
        }) }
    </Box>
  )
}

export default TasksList;
