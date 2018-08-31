import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as Loadable from 'react-loadable';
import Loader from './components/Loader';

const Landing = Loadable({
  loader: () => import('./views/Landing'),
  loading: Loader,
  delay: 200
});

export default class App extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <header>
          <h1>Planner</h1>
        </header>
        <Switch>
          <Route exact={true} path="/" component={Landing} />
        </Switch>
      </div>
    );
  }
}
