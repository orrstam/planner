import * as React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import * as TaskStore from '../stores/TaskStore';

const Task = styled.div`
  padding: 20px 15px;
`;

const IconWrapper = styled.div``;

interface ITaskProps {
  task: Planner.Tasks.Task
}

const TaskItem: React.StatelessComponent<ITaskProps> = ({
  task
}) => {

  const { taskStore } = TaskStore;

  const handleClick = async (e: any) => {
    if (task._id) {
      const deleted = await taskStore.deleteTask(task._id);
      console.log(deleted);
      // const deleted = await deleteTask(task._id);
    }
  }

  return (
    <Task>
      <IconWrapper onClick={handleClick}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </IconWrapper>
      <h4>{task.title}</h4>
      <div>{task.text}</div>
    </Task>
  )
}

export default TaskItem