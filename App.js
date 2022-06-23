import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/home/Home';
import LoginScreen from './screens/login/Login';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            const iconName = route.name === 'Home' ? 'home' : 'user';
            return (
              <Icon
                name={iconName}
                size={25}
                color={focused ? 'tomato' : undefined}
              />
            );
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Login" component={LoginScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
