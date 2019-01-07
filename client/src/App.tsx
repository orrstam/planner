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
    <Heading>Jonas</Heading>
  )
}

export default class App extends React.Component<{}, {}> {
  public render() {
    return (
      <Box pl="20px" bg="#fcfcfc">
        <Header />
        <Flex justifyContent="center" minHeight="100vh">
          <Box width="40vw">
            <Switch>
              <Route exact={true} path="/" component={Landing} />
              <Route exact={true} path="/removed-tasks" component={RemovedItems} />
            </Switch>
          </Box>
        </Flex>
      </Box>
    );
  }
}
