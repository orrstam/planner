import * as React from 'react';
import styled from 'styled-components';
import { stravaStore } from '../../stores';
import api, { getToken } from '../../services/api';
import { Flex, Box, ProfileWrapper } from '../layout';
import { distanceToKm, secondsTimeObject } from '../../services/helpers';
import CountUp from 'react-countup';

const Image = styled.img`
  width: 100%;
  height: auto;
`;

interface IFilterdActivitites {
  distance: number;
  elapsed_time: number;
  activities_count: number;
}

const Strava: React.FC<{}> = () => {
  const [athlete, setAthlete] = React.useState();
  const [activities, setAtivities] = React.useState();

  React.useEffect(() => {
    async function getAthlete() {
      const athlete = await stravaStore.fetchAthlete();
      setAthlete(athlete);
    }
    getAthlete();
  }, []);

  React.useEffect(() => {
    async function getActivities() {
      const response = await api.get('/packages/strava/athlete/activities', {
        params: {
          access_token: stravaStore.accessToken,
          page: 1
        },
        headers: { Authorization: `Bearer ${getToken()}` }
      });

      setAtivities(response.data);
    }

    if (athlete && !athlete.errors) {
      getActivities();
    }
  }, [athlete]);

  const filteredActivities = React.useMemo(() => {
    let filtered: IFilterdActivitites = {
      distance: 0,
      elapsed_time: 0,
      activities_count: 0
    };
    if (activities) {
      filtered = activities.reduce((a: any, b: any) => ({
        distance: a.distance + b.distance,
        elapsed_time: a.elapsed_time + b.elapsed_time
      }));

      Object.assign(filtered, { activities_count: activities.length });
    }

    return filtered;
  }, [activities]);

  return (
    <Flex
      p="boxPadding"
      bg="background"
      width="100%"
      alignItems="center"
      flexDirection="column"
    >
      <Box>
        {athlete && (
          <ProfileWrapper>
            <Image src={athlete.profile} />
          </ProfileWrapper>
        )}
      </Box>
      <Flex width="100%" mt="defaultMargin" fontSize="20px" color="text">
        {filteredActivities && (
          <>

            <Flex flex="1" alignItems="center" flexDirection="column">
              <Box fontSize="13px" color="textLight" mb="5px">
                Runs
              </Box>
              <CountUp end={filteredActivities.activities_count} />
            </Flex>
            <Flex flex="1" alignItems="center" flexDirection="column">
              <Box fontSize="13px" color="textLight" mb="5px">
                Distance
              </Box>
              <CountUp end={distanceToKm(filteredActivities.distance)} suffix=" km" decimals={2} />
            </Flex>
            <Flex flex="1" alignItems="center" flexDirection="column">
              <Box fontSize="13px" color="textLight" mb="5px">
                Time
              </Box>
              <Flex flexWrap="wrap">
                <CountUp end={secondsTimeObject(filteredActivities.elapsed_time).hours } suffix="h" />
                <CountUp end={secondsTimeObject(filteredActivities.elapsed_time).minutes} style={{ marginLeft: '5px' }} suffix="m" />
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export { Strava };
