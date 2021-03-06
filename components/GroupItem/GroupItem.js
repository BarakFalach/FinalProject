import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import GroupItemFooter from './GroupItemFooter';

const GroupItem = () => {
  return (
    <View style={styles.container}>
      <View style={{flex: 2, paddingTop: 5}}>
        <Text style={styles.headerText}>Group Name</Text>
      </View>
      <View style={{flex: 5}}>
        <Image
          style={styles.circle}
          source={require('../../assets/group_avatar.png')}
        />
      </View>
      <View style={styles.iconContainer}>
        <GroupItemFooter />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1FAEE',
    borderRadius: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: '#D9D9D9',
  },
  iconContainer: {
    flex: 4,
    width: '100%',
    paddingRight: 20,
    paddingLeft: 20,
  },
});

export default GroupItem;
