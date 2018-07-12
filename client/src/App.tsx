import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as Loadable from 'react-loadable';
import Loader from './components/Loader';

const Landing = Loadable({
  loader: () => import('./views/Landing'),
  loading: Loader,
  delay: 1000
});

export default class App extends React.Component<any, any> {

  public componentDidMount(): void {
    // 
  }

  public render() {
    return (
      <div>
        <header>
          <h1>Hello, yes this is APP</h1>
        </header>
        <Switch>
          <Route path="/" component={Landing} />
        </Switch>
      </div>
    );
  }
}
