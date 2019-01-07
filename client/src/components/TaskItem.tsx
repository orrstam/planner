import * as React from 'react';
import Icon from './Icon';
import { Box, Flex } from './layout/';
import EditTaskModal from './EditTaskModal';
import TaskType from './TaskType';

interface ITaskProps {
  task: Planner.Tasks.Task,
  icons: Array<Planner.Tasks.Icon>,
  types?: Planner.TaskTypes.Type[]
}

const TaskItem: React.StatelessComponent<ITaskProps> = ({
  task,
  icons,
  types
}) => {
  return (
    <Box p="20px 10px 30px" mb="25px" bg="#fff" width="100%" boxShadow="1px 4px 15px -2px #ccc;">

      { (task.types) ? task.types.map((type: any, key: number) => {
          return (
            <TaskType type={type} key={key} />
          )
      } ) : null }

      <Flex>
        <Flex mb="10px" justifyContent="flex-end" justifySelf="flex-end" style={{ flex: 1 }}>
          { icons.map((icon: any, key: number) => {
            return(
                <Icon color="#7f7f7f" onClick={ icon.onClick } key={key} icon={icon.icon} />
                )
          }) }
        </Flex>
      </Flex>

      <Box color="#333">
        <h4 style={{marginBottom: '5px', textTransform: 'capitalize'}}>{task.title}</h4>
        <div>{task.text}</div>
      </Box>

      { (types) ? <EditTaskModal types={types} task={task} /> : null }
    </Box>
  )
}

export default TaskItem