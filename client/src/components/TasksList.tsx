import * as React from 'react';
import styled from 'styled-components';
import AddTaskForm from './AddTaskForm';

const Wrapper = styled.div``; 
const Task = styled.div``;

interface ITaskListProps {
  tasks: Planner.Tasks.Task[],
}

const TasksList: React.StatelessComponent<ITaskListProps> = ({
  tasks
}) => {
  return (
    <Wrapper>
      <AddTaskForm />
      { tasks.map((task, key) => {
        return (
          <Task key={task._id}><h3>{task.title}</h3><div>{task.text}</div></Task>
        )
      }) }
    </Wrapper>
  )
}

export default TasksList;
