import React from 'react';
import {Text} from 'react-native';
import {Progress, VStack} from 'native-base';
import {UserContext} from '../App';
import {DAYLI_GOAL, Fonts} from '../utils/constants';

const HomeHeader = () => {
  const {user} = React.useContext(UserContext);
  const progress = (user?.todayStepCount / DAYLI_GOAL) * 100;
  return (
    <VStack padding={4} space={3}>
      <Text
        style={{fontFamily: Fonts.SemiBold, fontSize: 24}}
        size="md">{`Welcome ${user?.name}`}</Text>
      <VStack space={2}>
        <Text
          style={{
            fontFamily: Fonts.SemiBold,
            fontSize: 16,
          }}>{`${user.todayStepCount} steps today out of ${DAYLI_GOAL}`}</Text>
        <Progress value={progress} size="xl" />
      </VStack>
    </VStack>
  );
};

export default HomeHeader;
