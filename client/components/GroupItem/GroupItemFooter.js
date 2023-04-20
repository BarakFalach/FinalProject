import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useGroup} from '../../hooks/useGroup';
import {useUser} from '../../hooks/useUser';
import GroupIconItem from './GroupIconItem';

const icons = {
  score: require('../../assets/score.png'),
  podium: require('../../assets/podium.png'),
  group: require('../../assets/group.png'),
};

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

const GroupItemFooter = () => {
  const {user} = useUser();
  const {group} = useGroup();
  const position =
    group?.leaderBoard?.findIndex(member => member?.name === user?.name) + 1;
  return (
    <View style={groupItemFooterStyles.container}>
      <GroupIconItem iconSource={icons.score} value={user?.score} />
      <GroupIconItem
        iconSource={icons.podium}
        value={convertToOrdinal(position)}
      />
      <GroupIconItem
        iconSource={icons.group}
        value={group?.groupMembers?.length}
      />
    </View>
  );
};

export const groupItemFooterStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default GroupItemFooter;
