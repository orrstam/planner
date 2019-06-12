import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { TaskStore, TypeStore, uiStore } from '../stores/';
import TasksList from '../components/TasksList';
import Filter from '../components/Filter';
import { Flex } from '../components/layout';
import Icon from '../components/Icon';

const FormToggle = observer(({}) => {
  const toggleForm = () => {
    uiStore.setShowTaskForm();
  };

  return (
    <Icon
      onClick={toggleForm}
      color='rgb(149, 195, 141, 0.75)'
      size='2x'
      icon={!uiStore.showTaskForm ? 'plus-circle' : 'minus-circle'}
    />
  );
});

interface LandingViewProps {
  taskStore: TaskStore;
  typeStore: TypeStore;
  match: any;
}

@inject('taskStore', 'typeStore')
@observer
export default class Landing extends React.Component<LandingViewProps> {
  public componentDidMount(): void {
    this.initialFetch();
  }

  public async initialFetch() {
    this.props.taskStore!.fetch();
    this.props.typeStore.fetch();
  }

  public render() {
    const tasks = this.props.taskStore!.taskList;

    return (
      <Flex justifyContent='center' width='100vw' p='0 10px'>
        <Flex width={[1, 2 / 3]} flexDirection='column'>
          <Filter
            taskStore={this.props.taskStore}
            types={this.props.typeStore.types.slice()}
          />
          <Flex mb='20px' justifyContent='flex-end'>
            <FormToggle />
          </Flex>
          <TasksList
            tasks={
              this.props.taskStore.filters.length
                ? this.props.taskStore.filteredTaskList
                : tasks.slice()
            }
            types={this.props.typeStore.types.slice()}
          />
        </Flex>
      </Flex>
    );
  }
}
