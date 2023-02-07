import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {GroupContext, UserContext} from '../../App';
import {useGroup} from '../../hooks/useGroup';
import {LineItem} from './LineItem';

function TableContainer(props) {
  const {group} = useGroup();
  const {user} = React.useContext(UserContext);
  return (
    <View style={{flex: 1}}>
      <View style={styles.topBar}>
        <Icon
          onPress={props.navigateToHomePage}
          size={20}
          name="arrow-left"
          color="black"
        />
        <View style={styles.groupName}>
          <Text style={styles.text}>{group.name}</Text>
          <View size={20} name="chevron-down" color="black" />
        </View>
        <View />
      </View>
      <ScrollView style={styles.listContainer}>
        {group?.leaderBoard?.map((currentUser, index) => (
          <LineItem key={currentUser.name} user={currentUser} place={index} />
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
    backgroundColor: '#F1FAEE',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: -2},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    flexDirection: 'row',
  },
  text: {color: 'black', fontWeight: '500', fontSize: 16},
  groupName: {flexDirection: 'row', justifyContent: 'space-around', flex: 0.4},
  listContainer: {
    flex: 0.9,
    padding: 10,
    overflow: 'scroll',
    borderWidth: 2,
    borderColor: '#AAC1A3',
  },
});

export default TableContainer;
