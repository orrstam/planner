import * as React from 'react';
import Icon from './Icon';
import { Box } from './layout/'

interface ITaskProps {
  task: Planner.Tasks.Task,
  icons: Array<Planner.Tasks.Icon>
}

const TaskItem: React.StatelessComponent<ITaskProps> = ({
  task,
  icons
}) => {

  return (
    <Box p="30px 10px" mb="15px" bg="#fff">
      { icons.map((icon: any, key: number) => {
        return(
          <Icon onClick={ icon.onClick } key={key} icon={icon.icon} />
        )
      }) }
      <h4>{task.title}</h4>
      <div>{task.text}</div>
    </Box>
  )
}

export default TaskItem