import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {VStack} from 'native-base';

import HomeHeader from '../../components/HomeHeader';
import GroupItem from '../../components/GroupItem/GroupItem';

function HomeScreen({navigation}) {
  const AddActivityNavigation = () => {
    navigation.navigate('Add Activity');
  };

  return (
    <VStack flex={1}>
      <HomeHeader />
      <View style={screenStyle.container}>
        <View style={screenStyle.body}>
          <GroupItem />
        </View>
      </View>
      {/* <View
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
      </View> */}
    </VStack>
  );
}

export const screenStyle = StyleSheet.create({
  container: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'stretch',
    // backgroundColor: '#57cc99',
  },
  body: {
    flex: 0.7,
    paddingTop: 30,
    paddingBottom: 30,
    paddingRight: 80,
    paddingLeft: 80,
  },
});

export default HomeScreen;
