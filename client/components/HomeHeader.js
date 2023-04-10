import React from 'react';
import {Heading, Progress, Text, VStack} from 'native-base';
import {UserContext} from '../App';
import {DAYLI_GOAL} from '../utils/constants';

const HomeHeader = () => {
  const {user} = React.useContext(UserContext);
  const progress = (user?.todayStepCount / DAYLI_GOAL) * 100;
  return (
    <VStack padding={4} space={3}>
      <Heading size="md">{`welcome: ${user?.name}`}</Heading>
      <VStack space={2}>
        <Text fontSize="md">{`${user.todayStepCount} steps today out of ${DAYLI_GOAL}`}</Text>
        <Progress value={progress} size="xl" />
      </VStack>
    </VStack>
  );
};

export default HomeHeader;
