import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../login/Login';
import HomeScreen from './Home';
import {ThemeProvider} from '@rneui/themed';
import AddActivity from '../addActivity/AddActivity';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <ThemeProvider>
      <HomeStack.Navigator>
        <HomeStack.Screen name="Login" component={LoginScreen} />
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="Add Activity" component={AddActivity} />
      </HomeStack.Navigator>
    </ThemeProvider>
  );
}

export default HomeStackScreen;
