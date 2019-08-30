import * as React from 'react';
import styled from 'styled-components';
import CountUp from 'react-countup';
import Select from 'react-select';
import * as moment from 'moment';
import { stravaStore } from '../../stores';
import api, { getToken } from '../../services/api';
import { Flex, Box, ProfileWrapper, Button } from '../layout';
import { ExerciseGoals } from './ExerciseGoals';
import { useComparisonStats } from '../../hooks/useComparisonStats';
import { distanceToKm, secondsTimeObject } from '../../services/helpers';
import Icon from '../Icon';

const Image = styled.img`
  width: 100%;
  height: auto;
`;
interface IStats {
  count: number;
  distance: number;
  moving_time: number;
}

interface IStatsData {
  current: number;
  comparison: number;
}

interface IPeriodSelect {
  label: string;
  value: string;
}

const StatsTableRow = (props: {
  title: string;
  data: IStatsData;
  decimals: number;
}) => (
  <Flex width="100%" m="1px 0" fontSize="16px" color="text">
    <Flex
      flex="1"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Box fontSize="13px" color="textLight">
        {props.title}
      </Box>
    </Flex>
    <Flex
      flex="1"
      alignItems="center"
      flexDirection="column"
      bg="#fcfcfc"
      p="7.5px 0"
      mr="1px"
    >
      <CountUp end={props.data.current} decimals={props.decimals} />
    </Flex>
    <Flex
      flex="1"
      alignItems="center"
      flexDirection="column"
      bg="#fcfcfc"
      p="7.5px 0"
      ml="1px"
    >
      <CountUp end={props.data.comparison} decimals={props.decimals} />
    </Flex>
  </Flex>
);

const Strava: React.FC<{}> = () => {
  const [athlete, setAthlete] = React.useState();
  const [stats, setStats] = React.useState<IStats>();
  const [loadComparisonStats, setLoadComparisonStats] = React.useState<boolean>(
    false
  );
  const [comparisonPeriod, setComparisonPeriod] = React.useState<IPeriodSelect>(
    { label: 'Week', value: 'week' }
  );
  const comparisonStats = useComparisonStats(
    loadComparisonStats,
    comparisonPeriod.value as moment.unitOfTime.StartOf
  );

  React.useEffect(() => {
    async function getAthlete() {
      const athleteResponse = await stravaStore.fetchAthlete();

      setAthlete(athleteResponse);
    }
    getAthlete();
  }, []);

  React.useEffect(() => {
    async function getStats() {
      const statsResponse = await api.get('/packages/strava/athlete/stats', {
        params: {
          access_token: stravaStore.accessToken
        },
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setStats(statsResponse.data.all_run_totals);
    }

    getStats();
  }, [athlete]);

  const showMoreStats = () => {
    setLoadComparisonStats(true);
  };

  const options = [
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' }
  ];
  const styles = {
    option: (provided: any, state: any) => ({
      ...provided,
      fontSize: '13px',
      cursor: 'pointer'
    }),
    container: (base: any) => ({
      ...base,
      width: '105px'
    }),
    control: (base: any) => ({
      ...base,
      border: 'none',
      fontSize: '13px',
      cursor: 'pointer'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    })
  };

  if (!athlete) {
    return <Box>No Athlete</Box>;
  }

  return (
    <Flex
      p="boxPadding"
      bg="background"
      width="100%"
      alignItems="center"
      flexDirection="column"
      boxShadow="1px 4px 15px -2px #ccc"
      mb="25px"
    >
      <Box>
        <ProfileWrapper>
          <Image src={athlete.profile} />
        </ProfileWrapper>
      </Box>
      <Flex
        width="100%"
        mt="defaultMargin"
        fontSize="16px"
        color="text"
        mb="15px"
        bg="#fcfcfc"
        borderTop="1px solid #dcdcdc"
        borderBottom="1px solid #dcdcdc"
        p="20px 0"
      >
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
              <CountUp
                end={distanceToKm(stats.distance)}
                suffix=" km"
                decimals={2}
              />
            </Flex>
            <Flex flex="1" alignItems="center" flexDirection="column">
              <Box fontSize="13px" color="textLight" mb="5px">
                Time
              </Box>
              <Flex flexWrap="wrap">
                <CountUp
                  end={secondsTimeObject(stats.moving_time).hours}
                  suffix=" h"
                  style={{ marginRight: '5px' }}
                />
                <CountUp
                  end={secondsTimeObject(stats.moving_time).minutes}
                  suffix=" min"
                />
              </Flex>
            </Flex>
          </>
        )}
      </Flex>

      {loadComparisonStats && comparisonStats ? (
        <>
          <ExerciseGoals />
          <Flex width="100%" m="5px 0" color="text">
            <Flex
              flex="1"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Select
                value={comparisonPeriod}
                options={options}
                styles={styles}
                onChange={(e: IPeriodSelect) => {
                  setComparisonPeriod(e);
                }}
              />
            </Flex>
            <Flex
              fontSize="13px"
              justifyContent="center"
              flex="1"
              alignItems="center"
              flexDirection="column"
              color="textLight"
            >
              This {comparisonPeriod.label}
            </Flex>
            <Flex
              fontSize="13px"
              justifyContent="center"
              flex="1"
              alignItems="center"
              flexDirection="column"
              color="textLight"
            >
              Last {comparisonPeriod.label}
            </Flex>
          </Flex>

          <StatsTableRow
            title="Distance (km)"
            data={{
              current: comparisonStats.current.distance,
              comparison: comparisonStats.comparison.distance
            }}
            decimals={2}
          />
          <StatsTableRow
            title="Splits (min/km)"
            data={{
              current: comparisonStats.current.splits,
              comparison: comparisonStats.comparison.splits
            }}
            decimals={2}
          />
          <StatsTableRow
            title="Activities"
            data={{
              current: comparisonStats.current.activities,
              comparison: comparisonStats.comparison.activities
            }}
            decimals={0}
          />
          <StatsTableRow
            title="Distance per activity (km)"
            data={{
              current: comparisonStats.current.distancePerActivity,
              comparison: comparisonStats.comparison.distancePerActivity
            }}
            decimals={2}
          />
        </>
      ) : (
        <Button
          bg="#ffffff"
          color="rgba(226, 125, 96, 1)"
          onClick={showMoreStats}
          mt="5px"
        >
          <Icon color="#7f7f7f" onClick={ close } icon={'angle-down'} size="2x" />
        </Button>
      )}
    </Flex>
  );
};

export { Strava };
