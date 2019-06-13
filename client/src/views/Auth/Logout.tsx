import * as React from 'react';
import { Redirect } from 'react-router';
import { destroyToken } from '../../services/api';
import { UserStore, userStore } from '../../stores';

interface ILogoutProps {
  userStore: UserStore;
}

const Logout: React.FC<ILogoutProps> = () => {
  const [isLoggedOut, setIsLoggedOut] = React.useState<boolean>(false);

  React.useEffect(() => {
    destroyToken();
    userStore.logout();
    setIsLoggedOut(true);
  });

  if (isLoggedOut) {
    return <Redirect to='/login' />;
  }

  return null;
};

export default Logout;
