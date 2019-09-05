import * as React from 'react';
import { parse } from 'query-string';
import api from '../services/api';
import { useStrava } from '../hooks/useStrava';
import { Flex, Box, Button, Logo, StyledLink } from '../components/layout';
import Spinner from '../components/Spinner';

const Packages: React.FC = () => {
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
    <Flex flexDirection="column">
      <Box mb="35px">Packages</Box>
      <Flex p="25px 10px" bg="#fff" flexDirection="column" alignItems="center">
        <Logo src="/img/strava_logo_orange.png" alt="" />
        {!athlete.done ? (
          <Spinner size="2x" icon="spinner" color="rgba(226, 125, 96, .7" />
        ) : athlete.done && Object.keys(athlete.data).length ? (
          <Box p="10px 0" textAlign="center" fadeIn={true}>
            Your Strava package is connected to Strava user{' '}
            <StyledLink
              color="linkInverted"
              href="https://www.strava.com/dashboard"
            >
              {athlete.data.firstname} {athlete.data.lastname}
            </StyledLink>
          </Box>
        ) : (
          <Button
            p="15px 0"
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
