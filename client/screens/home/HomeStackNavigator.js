import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../login/Login';
import HomeScreen from './Home';
import AddActivity from '../addActivity/AddActivity';
import JoinGroupScreen from '../joinGroup/JoinGroupScreen';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Login" component={LoginScreen} />
      <HomeStack.Screen name="Join Group" component={JoinGroupScreen} />
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Add Activity" component={AddActivity} />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
