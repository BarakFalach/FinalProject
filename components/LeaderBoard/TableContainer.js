import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {GroupContext} from '../../App';
import {LineItem} from './LineItem';

function TableContainer(props) {
  const {group} = React.useContext(GroupContext);
  return (
    <View style={{flex: 1}}>
      <View style={styles.topBar}>
        <Icon
          onPress={props.navigateToHomePage}
          size={20}
          name="arrow-left"
          color="white"
        />
        <View style={styles.groupName}>
          <Text style={styles.text}>{group.name}</Text>
          <View size={20} name="chevron-down" color="white" />
        </View>
        <View />
      </View>
      <ScrollView style={styles.listContainer}>
        {group.users.map((user, index) => (
          <LineItem key={user.id} user={user} place={index} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#57CC99',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: -2},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    flexDirection: 'row',
  },
  text: {color: 'white', fontWeight: '500', fontSize: 16},
  groupName: {flexDirection: 'row', justifyContent: 'space-around', flex: 0.4},
  listContainer: {borderWidth: 2, flex: 0.9, padding: 10, overflow: 'scroll'},
});

export default TableContainer;
