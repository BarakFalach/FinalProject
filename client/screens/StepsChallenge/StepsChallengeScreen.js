import React, {useEffect, useState} from 'react';
import {useSteps} from './useSteps';
import {Box, Button, Center, Select, VStack, HStack} from 'native-base';
import {StyleSheet, Text, View} from 'react-native';
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
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

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
        <Center
          borderColor={'#fed9b7'}
          borderBottomWidth={2}
          paddingBottom={3}
          margin={3}>
          <Text style={styles.heading}>Steps Tracking</Text>
        </Center>
        {/* <Center marginTop={4}>
          <Text style={styles.heading}>Steps Tracking</Text>
        </Center> */}
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
              <Select.Item
                label="Month"
                value={false}
                isDisabled={!option.personal}
              />
            </Select>
          </Box>
        </VStack>
        <Box
          margin={screenWidth * 0.02}
          padding={screenWidth * 0.01}
          width={screenWidth * 0.3}
          borderColor={'#fed9b7'}
          borderBottomWidth={2}>
          <Text style={styles.semiHeader}>{`${
            option.personal ? 'My' : 'Group'
          } Steps`}</Text>
        </Box>
        {isLoading ? (
          <Loader />
        ) : (
          // <View style={{padding: screenWidth * 0.01}}>
          <Box
            bg="white"
            shadow={2}
            borderRadius="md"
            margin={screenWidth * 0.01}>
            <BarChart
              data={data}
              width={screenWidth * 0.95}
              height={screenHeight * 0.35}
              chartConfig={chartConfig}
              fromZero
              showValuesOnTopOfBars
            />
          </Box>
          // </View>
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
    fontFamily: Fonts.Bold,
    color: Colors.blue,
    fontSize: 20,
  },
  semiHeader: {
    fontFamily: Fonts.SemiBold,
    color: Colors.blue,
    fontSize: 16,
  },
});

export default StepsChallengeScreen;
