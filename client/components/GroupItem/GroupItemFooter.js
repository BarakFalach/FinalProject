import React from 'react';
import {StyleSheet, View} from 'react-native';
import {GroupContext} from '../../App';
import {useGroup} from '../../hooks/useGroup';
import {useUser} from '../../hooks/useUser';
import GroupIconItem from './GroupIconItem';

const icons = {
  score: require('../../assets/score.png'),
  podium: require('../../assets/podium.png'),
  group: require('../../assets/group.png'),
};

const GroupItemFooter = () => {
  const {user} = useUser();
  const {group} = React.useContext(GroupContext);
  return (
    <View style={groupItemFooterStyles.container}>
      <GroupIconItem iconSource={icons.score} value={user?.score} />
      <GroupIconItem iconSource={icons.podium} value={'1st'} />
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
