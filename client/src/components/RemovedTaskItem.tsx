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
  task
}) => {

  return (
    <TaskWrapper>
      <TaskItem task={task} />
    </TaskWrapper>
  )
}

export default RemovedTaskItem