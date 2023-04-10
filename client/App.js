import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import StepsChallenge from './screens/StepsChallenge/StepsChallengeScreen';
import HomeStackScreen from './screens/home/HomeStackNavigator';
import LeaderBoardScreen from './screens/leaderBoard/LeaderBoardScreen';
import {NativeBaseProvider} from 'native-base';
// import AchievementsScreen from './screens/achievements/Achievements';

const Tab = createBottomTabNavigator();

export const WeeklyDataContext = React.createContext();
export const GroupContext = React.createContext();
export const UserContext = React.createContext();

const screenNameToIconName = {
  HomeStack: 'home',
  Login: 'gear',
  LeaderBoard: 'star',
  Week: 'calendar',
  Achievements: 'star',
  'Steps Challenge': 'trophy',
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
          <Tab.Screen name="Steps Challenge" component={StepsChallenge} />
          <Tab.Screen name="LeaderBoard" component={LeaderBoardScreen} />
          {/* <Tab.Screen name="Achievements" component={AchievementsScreen} /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function App() {
  const [group, setGroup] = React.useState(undefined);
  const [weeklySteps, setWeeklySteps] = React.useState([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
  ]);
  const [user, setUser] = React.useState(undefined);
  return (
    <NativeBaseProvider>
      <UserContext.Provider value={{user, setUser}}>
        <GroupContext.Provider value={{group, setGroup}}>
          <WeeklyDataContext.Provider value={{weeklySteps, setWeeklySteps}}>
            <AppComponent />
          </WeeklyDataContext.Provider>
        </GroupContext.Provider>
      </UserContext.Provider>
    </NativeBaseProvider>
  );
}
