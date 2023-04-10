import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../login/Login';
import HomeScreen from './Home';
import AddActivity from '../addActivity/AddActivity';
import JoinGroupScreen from '../joinGroup/JoinGroupScreen';
import {Colors} from '../../utils/constants';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerTitleAlign: 'center',

        headerStyle: {
          backgroundColor: Colors.blue,
        },
      }}>
      <HomeStack.Screen name="Login" component={LoginScreen} />
      <HomeStack.Screen name="Join Group" component={JoinGroupScreen} />
      <HomeStack.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeScreen}
      />
      <HomeStack.Screen name="Add Activity" component={AddActivity} />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
