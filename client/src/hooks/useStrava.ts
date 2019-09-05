import * as React from 'react';
import api, { getToken } from '../services/api';
import { userStore, stravaStore } from '../stores/';

interface AthleteProps {
  data: {
    firstname?: string;
    lastname?: string;
  };
  done: boolean;
}

export function useStrava(code: string | undefined) {
  const [athlete, setAthlete] = React.useState<AthleteProps>({
    data: {},
    done: false
  });

  React.useEffect(() => {
    async function fetchToken() {
      const response = await api.get('/packages/strava/token', {
        params: { code }
      });

      if (response.status === 200 && response.data) {
        api.put(
          '/users/user/update',
          {
            id: userStore.activeUser,
            stravaToken: response.data.access_token,
            packages: 'strava'
          },
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );

        setAthlete(response.data.athlete);
      }
    }

    async function fetchAthlete() {
      try {
        const athlete = await stravaStore.fetchAthlete();

        if (!athlete) {
          setAthlete({data: {}, done: true});
        }

        if (!athlete.message) {
          setAthlete({
            data: { firstname: athlete.firstname, lastname: athlete.lastname },
            done: true
          });
        }
      } catch (error) {
        //
      }
    }

    if (code) {
      fetchToken();
    } else {
      fetchAthlete();
    }
  }, [code]);

  return [athlete];
}
