import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import WeekView from './screens/weekView/WeekView';
import HomeStackScreen from './screens/home/HomeStackNavigator';
import LeaderBoardScreen from './screens/leaderBoard/LeaderBoardScreen';
import AchievementsScreen from './screens/achievements/Achievements';
import {mockUsers} from './utils/mockData';

const Tab = createBottomTabNavigator();

export const weeklyActivitiesContext = React.createContext();
export const GroupContext = React.createContext();

const screenNameToIconName = {
  HomeStack: 'home',
  Login: 'gear',
  LeaderBoard: 'trophy',
  Week: 'calendar',
  Achievements: 'star',
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
          <Tab.Screen name="LeaderBoard" component={LeaderBoardScreen} />
          <Tab.Screen name="Achievements" component={AchievementsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function App() {
  const group = {
    name: 'Class of 2023',
    users: mockUsers(25).reverse(),
  };
  const [weeklyActivities, setWeeklyActivity] = React.useState([
    'Weekly steps',
  ]);
  const addWeeklyActivity = activity =>
    setWeeklyActivity([...weeklyActivities, activity]);
  return (
    <GroupContext.Provider value={{group}}>
      <weeklyActivitiesContext.Provider
        value={{weeklyActivities, addWeeklyActivity}}>
        <AppComponent />
      </weeklyActivitiesContext.Provider>
    </GroupContext.Provider>
  );
}
