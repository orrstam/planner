import * as React from 'react';
import TaskItem from './TaskItem';
import styled from 'styled-components';
import { TaskStore } from '../stores';

interface IRemovedTaskItemProps {
  task: Planner.Tasks.Task,
  taskStore: TaskStore
}
const TaskWrapper = styled.div``;

const RemovedTaskItem: React.StatelessComponent<IRemovedTaskItemProps> = ({
  task,
  taskStore
}) => {

  const clickHandler = async () => {
    if (task._id) {
      const restored = await taskStore!.restoreTask(task._id);
      console.log('Restored:', restored);
    }
  }

  const undoIcon: Planner.Tasks.Icon = {
    icon: 'undo',
    onClick: clickHandler
  }

  return (
    <TaskWrapper>
      <TaskItem task={task} icons={[undoIcon]} />
    </TaskWrapper>
  )
}

export default RemovedTaskItem