import * as React from 'react';
import styled from 'styled-components';
import Icon from './Icon';

const Task = styled.div`
  padding: 20px 15px;
`;

interface ITaskProps {
  task: Planner.Tasks.Task,
  icons: Array<Planner.Tasks.Icon>
}

const TaskItem: React.StatelessComponent<ITaskProps> = ({
  task,
  icons
}) => {

  return (
    <Task>
      { icons.map((icon: any, key: number) => {
        return(
          <Icon onClick={ icon.onClick } key={key} icon={icon.icon} />
        )
      }) }
      <h4>{task.title}</h4>
      <div>{task.text}</div>
    </Task>
  )
}

export default TaskItem