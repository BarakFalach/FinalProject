import React, {useEffect} from 'react';
import {View, StyleSheet, Button, Input, Text} from 'react-native';
import {useJoinGroup} from '../../api/useJoinGroup';
import {useGroup} from '../../hooks/useGroup';
import {useUser} from '../../hooks/useUser';

const JoinGroupScreen = ({navigation}) => {
  const {group, setGroupCode} = useGroup();
  const {user, setUser} = useUser();
  const {joinGroup} = useJoinGroup();
  useEffect(() => {
    if (group) {
      navigation.navigate('Home');
    }
  }, [group, navigation]);

  if (user?.groupCode) {
    return <Text>Loading</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={{width: 200}}>
        <Text>jon</Text>
        <Input onChangeText={setGroupCode} placeholder="group code" />
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
