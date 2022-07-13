import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import GroupIconItem from './GroupIconItem';

const icons = {
  score: require('../../assets/score.png'),
  podium: require('../../assets/podium.png'),
  group: require('../../assets/group.png'),
};

const GroupItemFooter = () => {
  return (
    <View style={groupItemFooterStyles.container}>
      <GroupIconItem iconSource={icons.score} value="154" />
      <GroupIconItem iconSource={icons.podium} value="5th" />
      <GroupIconItem iconSource={icons.group} value="32" />
    </View>
  );
};

export const groupItemFooterStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default GroupItemFooter;
