import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {useGroup} from '../../hooks/useGroup';
import {LineItem} from './LineItem';
import {Center} from 'native-base';
import {Colors, Fonts} from '../../utils/constants';

function TableContainer() {
  const {group} = useGroup();
  return (
    <View style={{flex: 1}}>
      <Center
        borderColor={'#fed9b7'}
        borderBottomWidth={2}
        paddingBottom={3}
        margin={3}>
        <Text style={styles.heading}>Leader Board</Text>
      </Center>
      <ScrollView style={styles.listContainer}>
        {group?.leaderBoard?.map((currentUser, index) => (
          <LineItem key={currentUser.name} user={currentUser} place={index} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {color: 'black', fontWeight: '500', fontSize: 16},
  groupName: {flexDirection: 'row', justifyContent: 'space-around', flex: 0.4},
  listContainer: {
    flex: 0.9,
    padding: 10,
    overflow: 'scroll',
  },
  heading: {
    fontFamily: Fonts.Bold,
    color: Colors.blue,
    fontSize: 20,
  },
});

export default TableContainer;
