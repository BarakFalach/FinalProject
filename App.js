import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import GroupsScreen from './screens/groups/Groups';
import WeekView from './screens/weekView/WeekView';
import HomeStackScreen from './screens/home/HomeStackNavigator';

const Tab = createBottomTabNavigator();

export const weeklyActivitiesContext = React.createContext();

const screenNameToIconName = {
  HomeStack: 'home',
  Login: 'gear',
  Group: 'group',
  Week: 'calendar',
};

function AppComponent() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            headerShown: false,
            tabBarIcon: ({focused}) => {
              const iconName = screenNameToIconName[route.name];
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
          <Tab.Screen name="HomeStack" component={HomeStackScreen} />
          <Tab.Screen name="Week" component={WeekView} />
          <Tab.Screen name="Group" component={GroupsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function App() {
  const [weeklyActivities, setWeeklyActivity] = React.useState([
    'Weekly steps',
  ]);
  const addWeeklyActivity = activity =>
    setWeeklyActivity([...weeklyActivities, activity]);
  return (
    <weeklyActivitiesContext.Provider
      value={{weeklyActivities, addWeeklyActivity}}>
      <AppComponent />
    </weeklyActivitiesContext.Provider>
  );
}
