import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {useJoinGroup} from '../../api/useJoinGroup';
import {useGroup} from '../../hooks/useGroup';
import {useUser} from '../../hooks/useUser';
import {Input, VStack, Button, Center} from 'native-base';
import {Colors, Fonts} from '../../utils/constants';
import {Loader} from '../../components/common/Loader';

const JoinGroupScreen = ({navigation}) => {
  const {group} = useGroup();
  const {user} = useUser();
  const [groupInputCode, setGroupCode] = useState('');
  const {joinGroup, isLoading} = useJoinGroup();
  useEffect(() => {
    if (group) {
      navigation.navigate('HomeStack');
    }
  }, [group, navigation]);

  if (user?.groupCode) {
    return (
      <Center height={Dimensions.get('window').height}>
        <Loader />
      </Center>
    );
  }
  return (
    <View style={styles.container}>
      <VStack space={4} alignItems="center" width={'250px'}>
        <Text style={{color: Colors.blue, fontFamily: Fonts.SemiBold}}>
          Ready to get fit with a group? Enter your group code to join now!
        </Text>
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
          bg={Colors.blue}
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
