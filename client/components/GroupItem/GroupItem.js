import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
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
      <View style={styles.iconContainer}>
        {group?.leaderBoard ? <GroupItemFooter /> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.15,
    margin: 10,
    padding: 10,
    backgroundColor: '#fed9b7',
    borderRadius: 10,
    //add shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    flex: 1,
    width: '100%',
    alignContent: 'flex-end',
    // paddingRight: 20,
    // paddingLeft: 20,
  },
});

export default GroupItem;
