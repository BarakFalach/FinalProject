import React, {useEffect, useState} from 'react';
import {useSteps} from './useSteps';
import {Box, Button, Center, Select, VStack, HStack} from 'native-base';
import {StyleSheet, Text} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import {Loader} from '../../components/common/Loader';
import {Colors, Fonts} from '../../utils/constants';

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 0.5) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 0.5,
  barPercentage: 0.5,
  propsForLabels: {
    fontFamily: Fonts.regular,
  },
  style: {
    borderRadius: 16,
    backgroundColor: 'transparent', // Set backgroundColor to 'transparent'
  },
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
          <Text style={styles.heading}>Steps Tracking</Text>
        </Center>
        <VStack paddingLeft={2} space={3} paddingTop={4} paddingBottom={3}>
          <HStack space={3} width="200px">
            <Button
              flex={1}
              variant={option?.personal ? 'outline' : 'solid'}
              isLoading={isLoading}
              isLoadingText="..."
              backgroundColor="#fed9b7"
              isDisabled={option?.personal}
              onPress={() =>
                option?.personal
                  ? null
                  : onOptionChange({
                      name: 'personal',
                      value: true,
                    })
              }>
              <Text style={styles.text}>Me</Text>
            </Button>
            <Button
              flex={1}
              variant={option?.personal ? 'solid' : 'outline'}
              isLoading={isLoading}
              backgroundColor="#fed9b7"
              textColo
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
              <Text style={styles.text}>Group</Text>
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
        <Box padding={2}>
          <Text style={styles.semiHeader}>{`${
            option.personal ? 'My' : 'Group'
          } Steps`}</Text>
        </Box>
        {isLoading ? (
          <Loader />
        ) : (
          <Box bg="white" shadow={2} borderRadius="md" padding="0.5">
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

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.regular,
    fontSize: 12,
  },
  heading: {
    fontFamily: Fonts.SemiBold,
    color: Colors.blue,
    fontSize: 18,
  },
  semiHeader: {
    fontFamily: Fonts.SemiBold,
    color: Colors.blue,
    fontSize: 16,
  },
});

export default StepsChallengeScreen;
