import React, {useEffect} from 'react';
import {View, StyleSheet, Button, Input} from 'react-native';
import {useJoinGroup} from '../../api/useJoinGroup';
import {GroupContext} from '../../App';

const JoinGroupScreen = ({navigation}) => {
  const {group} = React.useContext(GroupContext);
  const [groupCode, setGroupCode] = React.useState('');
  const {joinGroup} = useJoinGroup();
  useEffect(() => {
    if (group) {
      navigation.navigate('Home');
    }
  }, [group, navigation]);
  return (
    <View style={styles.container}>
      <View style={{width: 200}}>
        {/* <Input onChangeText={setGroupCode} placeholder="group code" /> */}
        {/* <Button onPress={() => joinGroup(groupCode)} title="Join" /> */}
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

export default JoinGroupScreen;
