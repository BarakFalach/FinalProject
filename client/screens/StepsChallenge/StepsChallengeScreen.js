import React, {useEffect, useState} from 'react';
import {useSteps} from './useSteps';
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
import {Loader} from '../../components/common/Loader';

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 0.5,
  barPercentage: 0.5,
};

const StepsChallengeScreen = () => {
  const {data, isLoading, getPersonalWeek, getPersonalMonth} = useSteps();
  const [fetchOption, setFetchOption] = useState({
    week: true,
    personal: true,
  });

  const onOptionChange = ({value, name}) => {
    setFetchOption(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetch = () => {
    switch (fetchOption.week) {
      case true:
        fetchOption?.personal ? getPersonalWeek() : null;
        break;
      case false:
        fetchOption?.personal ? getPersonalMonth() : null;
        break;
      default:
        break;
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetch(), [fetchOption]);

  return (
    <>
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
            <Select
              onValueChange={value => onOptionChange({value, name: 'week'})}
              minWidth="150"
              defaultValue={true}>
              <Select.Item label="Week" value={true} />
              <Select.Item label="Month" value={false} />
            </Select>
          </Box>
        </VStack>
        {isLoading ? (
          <Loader />
        ) : (
          <Box>
            <BarChart
              data={data}
              width={Dimensions.get('window').width}
              height={200}
              chartConfig={chartConfig}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default StepsChallengeScreen;
