import * as React from 'react';
import { observer } from 'mobx-react';
import { Route, Redirect } from 'react-router';
import { userStore } from '../stores/UserStore';
import { observable, action } from 'mobx';

interface IPrivateRouteProps {
  path: string;
  component: React.ComponentType<any>;
}

interface IAuthenticateProps {}

@observer
class Authenticate extends React.Component<IAuthenticateProps> {
  @observable isAuthenticated: boolean = false;
  @observable redirect: boolean = false;

  @action
  setAuthenticated(value: boolean): void {
    this.isAuthenticated = value;
  }

  @action
  setRedirect(value: boolean): void {
    this.redirect = value;
  }

  componentDidMount() {
    userStore.authenticate().then(response => {
      if (response && response.status === 200) {
        this.setAuthenticated(true);
      } else {
        this.setRedirect(true);
      }
    });
  }

  render() {
    if (this.isAuthenticated) {
      return this.props.children;
    }

    if (this.redirect) {
      return (
        <Redirect
          to={{
            pathname: '/login'
          }}
        />
      );
    }

    return null;
  }
}

const PrivateRoute = ({ component: Component }: IPrivateRouteProps) => (
  <Route
    render={props => {
      return (
        <Authenticate>
          <Component />
        </Authenticate>
      );
    }}
  />
);

export default PrivateRoute;
