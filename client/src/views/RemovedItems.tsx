import * as React from 'react';
import { inject, observer } from 'mobx-react';
import RemovedTaskItem from '../components/RemovedTaskItem';
import TaskStore, { taskStore } from '../stores/TaskStore';
import { Box } from '../components/layout';

interface IRemovedItemsProps {
  taskStore: TaskStore
}

@inject('taskStore')
@observer
export default class RemovedItems extends React.Component<IRemovedItemsProps> {
  public componentDidMount(): void {
    this.initialFetch();
  }

  public initialFetch() {
    this.props.taskStore.fetchDeleted = true;
    this.props.taskStore!.fetch();
  }

  public render() {
    const tasks = this.props.taskStore.taskList;

    return (
      <Box width="40vw">
        <h2>Removed Tasks</h2>
        { tasks.map((task, key) => {
        return (
          <RemovedTaskItem taskStore={taskStore} task={task} key={key} />
        )
      }) }
    </Box>
    )
  }
}
