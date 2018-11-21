import * as React from 'react';
import Icon from './Icon';
import { Box } from './layout/';
import EditTaskModal from './EditTaskModal';

interface ITaskProps {
  task: Planner.Tasks.Task,
  icons: Array<Planner.Tasks.Icon>
}

const TaskItem: React.StatelessComponent<ITaskProps> = ({
  task,
  icons
}) => {
  return (
    <Box p="30px 10px" mb="15px" bg="#fff" width="400px">
      <Box mb="10px">
      { icons.map((icon: any, key: number) => {
        return(
            <Icon onClick={ icon.onClick } key={key} icon={icon.icon} />
            )
      }) }
      </Box>
      <h4 style={{marginBottom: '5px'}}>{task.title}</h4>
      <div>{task.text}</div>
      <EditTaskModal task={task} />
    </Box>
  )
}

export default TaskItem