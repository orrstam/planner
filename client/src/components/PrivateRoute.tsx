import * as React from 'react';
import { observer } from 'mobx-react';
import { Route, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { userStore } from '../stores/UserStore';
import { observable, action } from 'mobx';
import { Flex, Box } from './layout';

interface IPrivateRouteProps {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
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

const Header = () => {
  return (
    <Flex alignSelf='flex-end' p='5px 0'>
      <Box color='linkInverted'>
        <Link style={{ color: 'inherit', textDecoration: 'none' }} to='/logout'>
          Bye
        </Link>
      </Box>
    </Flex>
  );
};

const PrivateRoute = ({ component: Component, exact }: IPrivateRouteProps) => (
  <Route
    exact={exact}
    render={props => {
      return (
        <Authenticate>
          <>
            <Header />
            <Component />
          </>
        </Authenticate>
      );
    }}
  />
);

export default PrivateRoute;
