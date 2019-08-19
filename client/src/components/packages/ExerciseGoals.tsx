import * as React from 'react';
import { VictoryPie, VictoryTooltip } from 'victory';
import { useExerciseGoals } from '../../hooks/useExerciseGoals';
import { Flex, Box } from '../layout';

const CustomLabel = (props: any) => {
  const toolTip: number = props.data[props.index].distance;

  return (
    <>
      <VictoryTooltip
        {...props}
        text={`${toolTip.toFixed(2)} km`}
        flyoutStyle={{
          stroke: 'none',
          fill: '#EEEEEE'
        }}
        style={{ padding: 7 }}
      />
    </>
  );
};

const ExerciseGoals: React.FC<{}> = () => {
  const goals = useExerciseGoals();

  if (!goals || !goals.length) {
    return null;
  }

  return (
    <Box width="100%" m="25px 0">
      <Flex justifyContent="center" flex="1">
        Goals
      </Flex>
      <Flex width="100%" p="15px 0" fontSize="16px" color="text">
        {goals.map(goal => {
          const percent = (goal.current.distance / goal.goal.distance) * 100;

          return (
            <Flex
              flex="1"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              key={Math.random()}
            >
              <Box fontSize="13px" color="textLight">
                {goal.period}
              </Box>
              <Flex fontSize="13px" color="textLight" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Box position="absolute" mt="-3px" >{`${percent.toFixed(2)}%`}</Box>
                <VictoryPie
                  width={150}
                  height={150}
                  data={[
                    { x: 1, y: percent, distance: goal.current.distance },
                    {
                      x: 2,
                      y: 100 - percent,
                      distance: goal.goal.distance - goal.current.distance
                    }
                  ]}
                  innerRadius={50}
                  radius={60}
                  labels={() => ''}
                  labelComponent={<CustomLabel goal={goal.goal.distance} />}
                  colorScale={['rgba(195,141,158,.75)', '#EEEEEE']}
                  events={[
                    {
                      target: 'parent',
                      eventHandlers: {
                        onMouseEnter: () => {
                          return [
                            {
                              target: 'labels',
                              mutation: (props) => {
                                Object.assign(props, { active: true });
                                return props;
                              }
                            }
                          ];
                        },
                        onMouseLeave: () => {
                          return [
                            {
                              target: 'labels',
                              mutation: (props) => {
                                Object.assign(props, { active: false });
                                return props;
                              }
                            }
                          ];
                        }
                      }
                    }
                  ]}
                />
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};

export { ExerciseGoals };
