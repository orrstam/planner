import * as React from 'react';
import { Box } from './layout/';
import theme from '../config/theme';
import { Circle } from './layout';

interface ITaskTypeProps {
  type: Planner.TaskTypes.Type
}

const TaskType: React.StatelessComponent<ITaskTypeProps> = ({
  type
}) => {
  return (
    <Box position="absolute" mt="-25px" ml="-15px">
      <Circle position="absolute" border="5px solid #fcfcfc" bg={`rgba(${theme.taskTypes.colors[type.name]}, 1)`} size="35px" />
    </Box>
  )
}

export default TaskType