import * as React from 'react';
import { useExerciseGoals } from '../../hooks/useExerciseGoals';
import { Flex, Box } from '../layout';

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
              <Box fontSize="13px" color="textLight">
              {goal.current.distance} / {goal.goal.distance}
              </Box>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};

export { ExerciseGoals };
