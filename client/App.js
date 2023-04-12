import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import StepsChallenge from './screens/StepsChallenge/StepsChallengeScreen';
import LeaderBoardScreen from './screens/leaderBoard/LeaderBoardScreen';
import {NativeBaseProvider} from 'native-base';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/login/Login';
import HomeScreen from './screens/home/Home';
import JoinGroupScreen from './screens/joinGroup/JoinGroupScreen';
import {Colors} from './utils/constants';
// import AddActivity from '../addActivity/AddActivity';
// import AchievementsScreen from './screens/achievements/Achievements';

const Tab = createBottomTabNavigator();

export const GroupContext = React.createContext();
export const UserContext = React.createContext();

const screenNameToIconName = {
  Home: 'home',
  Login: 'gear',
  LeaderBoard: 'star',
  Week: 'calendar',
  Achievements: 'star',
  'Steps Challenge': 'trophy',
};

const HomeStack = createNativeStackNavigator();

function HomeStackNavigator() {
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
        name="HomeStack"
        component={Tabs}
      />
      {/* <HomeStack.Screen name="Add Activity" component={AddActivity} /> */}
    </HomeStack.Navigator>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {backgroundColor: Colors.blue},
        tabBarIcon: ({focused}) => {
          const iconName = screenNameToIconName[route.name];
          return (
            <Icon
              name={iconName}
              size={25}
              color={focused ? '#fed9b7' : 'white'}
            />
          );
        },
        tabBarActiveTintColor: '#fed9b7',
        tabBarInactiveTintColor: 'white',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarVisible: false,
        }}
      />
      <Tab.Screen name="Steps Challenge" component={StepsChallenge} />
      <Tab.Screen name="LeaderBoard" component={LeaderBoardScreen} />
      {/* <Tab.Screen name="Achievements" component={AchievementsScreen} /> */}
    </Tab.Navigator>
  );
}

export default function App() {
  const [group, setGroup] = React.useState(undefined);
  const [user, setUser] = React.useState(undefined);
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <UserContext.Provider value={{user, setUser}}>
            <GroupContext.Provider value={{group, setGroup}}>
              <HomeStackNavigator />
            </GroupContext.Provider>
          </UserContext.Provider>
        </NavigationContainer>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
