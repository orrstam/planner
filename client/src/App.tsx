import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as Loadable from 'react-loadable';
import styled from 'styled-components';
import Loader from './components/Loader';
import { Flex, Box } from './components/layout';

const Landing = Loadable({
  loader: () => import('./views/Landing'),
  loading: Loader,
  delay: 200
});

const RemovedItems = Loadable({
  loader: () => import('./views/RemovedItems'),
  loading: Loader,
  delay: 200
});

const Header = () => {

  const Heading = styled.div`
    padding: 15px 0;
  `;

  return(
    <Heading>
      <h1>Planner</h1>
    </Heading>
  )
}

export default class App extends React.Component<{}, {}> {
  public render() {
    return (
      <Flex bg="#fcfcfc" justifyContent="center">
        <Box width="40vw">
          <Header />
          <Switch>
            <Route exact={true} path="/" component={Landing} />
            <Route exact={true} path="/removed-tasks" component={RemovedItems} />
          </Switch>
        </Box>
      </Flex>
    );
  }
}
