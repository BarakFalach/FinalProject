import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {VStack} from 'native-base';

import HomeHeader from '../../components/HomeHeader';
import GroupItem from '../../components/GroupItem/GroupItem';
import {Motivation} from '../../components/Motivation';
import {useGroup} from '../../hooks/useGroup';
import {useUser} from '../../hooks/useUser';

function convertToOrdinal(num) {
  if (isNaN(num)) {
    return num;
  }
  var lastDigit = num % 10;
  var lastTwoDigits = num % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return num + 'th';
  }
  switch (lastDigit) {
    case 1:
      return num + 'st';
    case 2:
      return num + 'nd';
    case 3:
      return num + 'rd';
    default:
      return num + 'th';
  }
}

function HomeScreen({navigation}) {
  const AddActivityNavigation = () => {
    navigation.navigate('Add Activity');
  };
  const {group} = useGroup();
  const {user} = useUser();
  const userIndex = group?.leaderBoard?.findIndex(
    member => member?.name === user?.name,
  );

  function calculateDistanceToNextLeader() {
    if (userIndex === 0) {
      return 'You are currently at the top of the leaderBoard. Keep it up!';
    } else {
      const distance =
        group?.leaderBoard[userIndex - 1].score -
          group?.leaderBoard[userIndex].score || 0;
      return `You're just ${distance} steps away from passing the person ahead of you. Keep going!`;
    }
  }

  function calculateDistanceToPrevLeader() {
    if (userIndex === group.leaderBoard.length - 1) {
      return 'You are currently at the bottom of the leaderBoard. Keep stepping up to climb higher!';
    } else {
      const distance =
        group.leaderBoard[userIndex].score -
        group.leaderBoard[userIndex + 1].score;
      return `Don't let your guard down! The person right below you is ${distance.toLocaleString(
        'US',
      )} steps behind. Keep stepping up!`;
    }
  }

  return (
    <VStack flex={1} space={3}>
      <HomeHeader />
      <View style={screenStyle.container}>
        <GroupItem />
        <View style={screenStyle.footer}>
          <Motivation content={calculateDistanceToNextLeader()} />
          <Motivation content={calculateDistanceToPrevLeader()} />
        </View>
      </View>
    </VStack>
  );
}

export const screenStyle = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  body: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingRight: 80,
    paddingLeft: 80,
  },
  footer: {
    marginTop: 30,
  },
});

export default HomeScreen;
