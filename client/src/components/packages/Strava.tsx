import * as React from 'react';
import styled from 'styled-components';
import CountUp from 'react-countup';
import { stravaStore } from '../../stores';
import api, { getToken } from '../../services/api';
import { Flex, Box, ProfileWrapper, Button } from '../layout';
import { useStravaSplits } from '../../hooks/useStravaSplits';
import { distanceToKm, secondsTimeObject } from '../../services/helpers';

const Image = styled.img`
  width: 100%;
  height: auto;
`;
interface IStats {
  count: number;
  distance: number;
  moving_time: number;
}

const SplitsHeader = styled.h3``;

const Strava: React.FC<{}> = () => {
  const [athlete, setAthlete] = React.useState();
  const [stats, setStats] = React.useState<IStats>();
  const [splitsSearch, setSplitsSearch] = React.useState<boolean>(false);
  const splits = useStravaSplits(splitsSearch);

  React.useEffect(() => {
    async function getAthlete() {
      const athlete = await stravaStore.fetchAthlete();

      setAthlete(athlete);
    }
    getAthlete();
  }, []);

  React.useEffect(() => {
    async function getStats() {
      const stats = await api.get('/packages/strava/athlete/stats', {
        params: {
          access_token: stravaStore.accessToken,
        },
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setStats(stats.data.all_run_totals);
    }

    getStats();
  }, [athlete])

  const showMoreStats = () => {
    setSplitsSearch(true);
  }

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
      <Flex width="100%" mt="defaultMargin" fontSize="20px" color="text" mb="10px">
        {stats && (
          <>
            <Flex flex="1" alignItems="center" flexDirection="column">
              <Box fontSize="13px" color="textLight" mb="5px">
                Runs
              </Box>
              <CountUp end={stats.count} />
            </Flex>
            <Flex flex="1" alignItems="center" flexDirection="column">
              <Box fontSize="13px" color="textLight" mb="5px">
                Distance
              </Box>
              <CountUp end={distanceToKm(stats.distance)} suffix=" km" decimals={2} />
            </Flex>
            <Flex flex="1" alignItems="center" flexDirection="column">
              <Box fontSize="13px" color="textLight" mb="5px">
                Time
              </Box>
              <Flex flexWrap="wrap">
                <CountUp end={secondsTimeObject(stats.moving_time).hours} suffix=" h" style={{ marginRight: '5px' }} />
                <CountUp end={secondsTimeObject(stats.moving_time).minutes} suffix=" min" />
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
      { splits && splits.done
        ?
          <>
            <Flex width="100%" mt="10px" fontSize="20px" color="text">
              <Flex flex="1" alignItems="center" flexDirection="column">
                <SplitsHeader style={{ fontSize: '16px', color: 'rgba(51,51,51,0.7)' }}>Avarage splits</SplitsHeader>
              </Flex>
            </Flex>
            <Flex width="100%" m="10px 0" fontSize="20px" color="text">
              <Flex flex="1" alignItems="center" flexDirection="column">
                <Box fontSize="13px" color="textLight" mb="5px">
                  Month
                </Box>
                <CountUp end={splits.monthly} decimals={2} />
              </Flex>
              <Flex flex="1" alignItems="center" flexDirection="column">
                <Box fontSize="13px" color="textLight" mb="5px">
                  Year
                </Box>
                <CountUp end={splits.yearly} decimals={2} />
              </Flex>
              <Flex flex="1" alignItems="center" flexDirection="column">
                <Box fontSize="13px" color="textLight" mb="5px">
                  All time
                </Box>
                <Flex flexWrap="wrap">
                  <CountUp end={splits.all_time} decimals={2} />
                </Flex>
              </Flex>
            </Flex>
          </>
        : <Button bg="#ffffff" color="rgba(226, 125, 96, 1)" onClick={showMoreStats} >show more</Button>
      }
    </Flex>
  );
};

export { Strava };
