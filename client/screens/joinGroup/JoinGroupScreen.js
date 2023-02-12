import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useJoinGroup} from '../../api/useJoinGroup';
import {useGroup} from '../../hooks/useGroup';
import {useUser} from '../../hooks/useUser';
import {Input, VStack, Button} from 'native-base';
import {Colors} from '../../utils/constants';

const JoinGroupScreen = ({navigation}) => {
  const {group} = useGroup();
  const {user} = useUser();
  const [groupInputCode, setGroupCode] = useState('');
  const {joinGroup, isLoading} = useJoinGroup();
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
      <VStack space={4} alignItems="center" width={'250px'}>
        <Input
          variant="underlined"
          onChangeText={setGroupCode}
          placeholder="group code"
          type="number"
          maxLength={4}
          keyboardType="number-pad"
          _text={{
            fontSize: '24px',
          }}
          _focus={{
            borderColor: Colors.primary,
            _text: {bg: Colors.secondary},
          }}
        />
        <Button
          bg={Colors.secondary}
          isLoading={isLoading}
          _loading={{
            bg: Colors.primary,
            opacity: '0.8',
          }}
          _text={{fontWeight: 'bold'}}
          width="100%"
          _hover={{
            bg: Colors.primary,
          }}
          _pressed={{
            bg: Colors.primary,
            opacity: '0.8',
          }}
          onPress={() => joinGroup(groupInputCode)}>
          Join Group
        </Button>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
