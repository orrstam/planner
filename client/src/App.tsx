import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as Loadable from 'react-loadable';
import Loader from './components/Loader';
import { Flex } from './components/layout';
import PrivateRoute from './components/PrivateRoute';

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

const Packages = Loadable({
  loader: () => import('./views/Packages'),
  loading: Loader
});

const Register = Loadable({
  loader: () => import('./views/Register'),
  loading: Loader
});

const Login = Loadable({
  loader: () => import('./views/Auth/Login'),
  loading: Loader
});

const Logout = Loadable({
  loader: () => import('./views/Auth/Logout'),
  loading: Loader
});

export default class App extends React.Component<{}, {}> {
  public render() {
    return (
      <Flex
        flexDirection='column'
        bg='#fcfcfc'
        width='100vw'
        minHeight='100vh'
        p='0 10px'
      >
        <Switch>
          <Route exact={true} path='/logout' component={Logout} />
          <Route exact={true} path='/login' component={Login} />
          <Route exact={true} path='/register' component={Register} />
          <PrivateRoute exact={true} path='/' component={Landing} />
          <PrivateRoute path='/packages' component={Packages} />
          <PrivateRoute path='/removed-tasks' component={RemovedItems} />
        </Switch>
      </Flex>
    );
  }
}
