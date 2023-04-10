import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {Box, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeHeader from '../../components/HomeHeader';
import GroupItem from '../../components/GroupItem/GroupItem';
import {Colors} from '../../utils/constants';

function HomeScreen({navigation}) {
  const AddActivityNavigation = () => {
    navigation.navigate('Add Activity');
  };

  return (
    <VStack flex={1} backgroundColor={Colors.backGround}>
      <HomeHeader />
      <View style={{flex: 0.7}}>
        <View style={screenStyle.body}>
          <GroupItem />
        </View>
      </View>
      <View
        style={{
          flex: 0.2,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <View
          style={{
            flex: 0.5,
            width: 160,
            paddingRight: 15,
            paddingBottom: 15,
          }}>
          <Button
            title="Add Activity"
            onPress={AddActivityNavigation}
            titleStyle={{fontWeight: 'bold', fontSize: 17}}
            buttonStyle={{
              backgroundColor: '#57CC99',
              justifyContent: 'space-around',
            }}
            radius={14}>
            <Icon name="plus" color="white" />
          </Button>
        </View>
      </View>
    </VStack>
  );
}

export const screenStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#57cc99',
  },
  body: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 30,
    paddingRight: 80,
    paddingLeft: 80,
  },
});

export default HomeScreen;
