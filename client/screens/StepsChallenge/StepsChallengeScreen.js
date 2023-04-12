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
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 0.5,
  barPercentage: 0.5,
};

const StepsChallengeScreen = () => {
  const {data, isLoading, getPersonalWeek, getPersonalMonth, getGroupWeek} =
    useSteps();
  const [option, setOption] = useState({
    week: true,
    personal: true,
  });

  const onOptionChange = ({value, name}) => {
    setOption(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetch = () => {
    switch (option.week) {
      case true:
        option?.personal ? getPersonalWeek() : getGroupWeek();
        break;
      case false:
        option?.personal ? getPersonalMonth() : null;
        break;
      default:
        break;
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetch(), [option]);

  return (
    <>
      <Box>
        <Center marginTop={4}>
          <Heading size="md">Steps Challenge</Heading>
        </Center>
        <VStack paddingLeft={2} space={3} paddingTop={4} paddingBottom={3}>
          <HStack space={3} width="200px">
            <Button
              flex={1}
              variant={option?.personal ? 'outline' : 'solid'}
              isLoading={isLoading}
              isLoadingText="..."
              isDisabled={option?.personal}
              onPress={() =>
                option?.personal
                  ? null
                  : onOptionChange({
                      name: 'personal',
                      value: true,
                    })
              }>
              Me
            </Button>
            <Button
              flex={1}
              variant={option?.personal ? 'solid' : 'outline'}
              isLoading={isLoading}
              isLoadingText="..."
              isDisabled={!option?.personal}
              onPress={() =>
                option?.personal
                  ? onOptionChange({
                      name: 'personal',
                      value: false,
                    })
                  : null
              }>
              Group
            </Button>
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
        <Heading size="sm" padding={2}>{`${
          option.personal ? 'My' : 'Group'
        } Steps`}</Heading>
        {isLoading ? (
          <Loader />
        ) : (
          <Box>
            <BarChart
              data={data}
              width={Dimensions.get('window').width}
              height={200}
              chartConfig={chartConfig}
              fromZero
              showValuesOnTopOfBars
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default StepsChallengeScreen;
