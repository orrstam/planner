import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { getWeek } from '../services/api';
import * as moment from 'moment';
import styled from 'styled-components';
import TasksList from '../components/TasksList'
import TaskStore from '../stores/TaskStore';

const Wrapper = styled.div``;

interface LandingViewProps {
  taskStore?: TaskStore,
  match: any
}

@inject('taskStore')
@observer
export default class Landing extends React.Component<LandingViewProps> {
  public componentDidMount(): void {
    this.initialFetch();
  }

  public initialFetch() {
    this.props.taskStore!.fetch();
  }

  public render() {
    const tasks = this.props.taskStore!.taskList;

    return (
      <Wrapper>
        <h2>Week: { getWeek(moment()) }</h2>
        <TasksList tasks={tasks.slice()} />
      </Wrapper>
    )
  }
}
