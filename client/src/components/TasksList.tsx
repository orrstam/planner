import * as React from 'react';
import styled from 'styled-components';
import AddTaskForm from './AddTaskForm';
import TaskItem from './TaskItem';

const Wrapper = styled.div``;

interface ITaskListProps {
  tasks: Planner.Tasks.Task[]
}

const TasksList: React.StatelessComponent<ITaskListProps> = ({
  tasks
}) => {
  return (
    <Wrapper>
      <AddTaskForm />
      { tasks.map((task, key) => {
        return (
          <TaskItem key={key} task={task} />
        )
      }) }
    </Wrapper>
  )
}

export default TasksList;
