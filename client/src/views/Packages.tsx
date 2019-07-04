import * as React from 'react';
import { parse } from 'query-string';
import { Flex, Box, Button, Logo } from '../components/layout';
import api from '../services/api';
import { useStrava } from '../hooks/useStrava';

interface IPackages {}

const Packages = (props: IPackages) => {
  const [redirect, setRedirect] = React.useState<string>();
  const code = React.useMemo(() => {
    const query = parse(window.location.search).code;

    if (query && typeof query === 'string') {
      return query;
    } else {
      return undefined;
    }
  }, [window.location]);
  const [athlete] = useStrava(code);

  if (redirect) {
    window.location.href = redirect;
  }

  return (
    <Flex flexDirection='column'>
      <Box mb='35px'>Packages</Box>
      <Flex p='25px 10px' bg='#fff' flexDirection='column' alignItems='center'>
        <Logo src='/img/strava_logo_orange.png' alt='' />
        {athlete ? (
          <Box p='10px 0' textAlign='center'>
            Your Strava package is connected to Strava user {athlete.firstname}{' '}
            {athlete.lastname}
          </Box>
        ) : (
          <Button
            onClick={async () => {
              const response = await api.get('/packages/strava/auth');

              if (response.status === 200) {
                setRedirect(response.data);
              }
            }}
          >
            Auth
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Packages;
