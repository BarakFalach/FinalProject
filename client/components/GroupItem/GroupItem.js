import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useGroup} from '../../hooks/useGroup';
import GroupItemFooter from './GroupItemFooter';

const GroupItem = () => {
  const {group} = useGroup();
  console.log('GroupItem', group);
  if (!group) {
    return <Text>Loading</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={{flex: 2, paddingTop: 5}}>
        <Text style={styles.headerText}>{group.groupName}</Text>
      </View>
      <View style={{flex: 5}}>
        <Image
          style={styles.circle}
          source={require('../../assets/group_avatar.png')}
        />
      </View>
      <View style={styles.iconContainer}>
        {group?.leaderBoard ? <GroupItemFooter /> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fed9b7',
    borderRadius: 10,
    //add shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: '#fff',
    borderColor: 'black',
    shadowOffset: {
      width: 23,
      height: -10,
    },
  },
  iconContainer: {
    flex: 4,
    width: '100%',
    paddingRight: 20,
    paddingLeft: 20,
  },
});

export default GroupItem;
