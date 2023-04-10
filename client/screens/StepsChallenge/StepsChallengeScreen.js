import React from 'react';
import {useWeeklySteps} from './useWeeklySteps';
import {
  Box,
  Button,
  Center,
  Select,
  Heading,
  VStack,
  HStack,
} from 'native-base';
import {BarChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 0.5,
  barPercentage: 0.5,
};

const StepsChallengeScreen = () => {
  const {data: selfWeeklySteps} = useWeeklySteps();

  return (
    <Box>
      <Center marginTop={4}>
        <Heading size="md">Steps Challenge</Heading>
      </Center>
      <VStack paddingLeft={2} space={3} paddingTop={4} paddingBottom={3}>
        <HStack space={3}>
          <Button>Me</Button>
          <Button isDisabled={true}>Group</Button>
        </HStack>
        <Box alignItems="flex-start" maxW="300">
          <Select minWidth="150" defaultValue="Week">
            <Select.Item label="Week" value="Week" />
            <Select.Item label="Month" value="Month" />
          </Select>
        </Box>
      </VStack>
      <Box>
        <BarChart
          data={selfWeeklySteps}
          width={Dimensions.get('window').width}
          height={200}
          chartConfig={chartConfig}
        />
      </Box>
    </Box>
  );
};

export default StepsChallengeScreen;
