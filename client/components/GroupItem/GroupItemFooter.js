import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import GroupIconItem from './GroupIconItem';

const icons = {
  score: require('../../assets/score.png'),
  podium: require('../../assets/podium.png'),
  group: require('../../assets/group.png'),
};

const GroupItemFooter = props => {
  return (
    <View style={groupItemFooterStyles.container}>
      <GroupIconItem iconSource={icons.score} value={props.user.score} />
      <GroupIconItem iconSource={icons.podium} value={`1st`} />
      <GroupIconItem iconSource={icons.group} value={props.groupLength} />
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
