import * as React from 'react';
// Importing Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Stores
import {useSessionStore, useAuthStore} from './src/zustand/store';

// Music playback
import PlayMusic from './playMusic';

// AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';

// Date and time
import date from 'date-and-time';

// Native screen support
import {enableScreens} from 'react-native-screens';

// Screens
import SettingsScreen from './src/screens/SettingsScreen';
import StatsScreen from './src/screens/StatsScreen';
import AskNameScreen from './src/screens/AskNameScreen';
import SessionScreen from './src/screens/SessionScreen';

// Tab bar
import TabBar from './src/components/TabBar';

// Responsiveness
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// Splash Screen
import SplashScreen from 'react-native-splash-screen';

// Error tracking
import * as Sentry from '@sentry/react-native';

enableScreens(true);

Sentry.init({
  dsn:
    'https://08475c6e4f54468fb9bc371f33c6e960@o426850.ingest.sentry.io/5370182',
  enableAutoSessionTracking: true,
});

// Navigators
const MaterialTab = createMaterialTopTabNavigator();

// Building App Navigation
const MaterialTabNav = () => {
  return (
    <MaterialTab.Navigator
      initialRouteName="Session"
      initialLayout={{width: wp(100), height: hp(100)}}
      tabBar={props => <TabBar {...props} />}>
      <MaterialTab.Screen name="Settings" component={SettingsScreen} />
      <MaterialTab.Screen name="Session" component={SessionScreen} />
      <MaterialTab.Screen name="Stats" component={StatsScreen} />
    </MaterialTab.Navigator>
  );
};

// App
const App = () => {
  // Tells whether the set up is complete for first time users
  const setUpComplete = useAuthStore(state => state.setUpComplete);
  // state variable for if app is still rendering and the user is new
  const [isLoadingAndNewUser, setIsLoadingAndNewUser] = React.useState([
    true,
    null,
  ]);

  // checks for name in storage to know whether to render Home or not
  React.useEffect(() => {
    const checkForName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        if (storedName) {
          setIsLoadingAndNewUser([false, false]);
        } else {
          const today = date.format(new Date(), 'MMM DD YYYY');
          const initial = {
            [today]: [{category: 'workout'}, {category: 'general'}],
            'Jun 20 2020': [{category: 'workout'}, {category: 'chores'}],
          }; // allows variable to be used in object

          await AsyncStorage.setItem('sessionInfo', JSON.stringify(initial));

          setIsLoadingAndNewUser([false, true]);
        }
      } catch (error) {
        console.log('check name error: ', error);
      }
    };
    checkForName();
  }, [setUpComplete]);

  if (isLoadingAndNewUser[0] === false && isLoadingAndNewUser[1] === false) {
    try {
      return (
        <NavigationContainer>
          <MaterialTabNav />
        </NavigationContainer>
      );
    } finally {
      SplashScreen.hide();
    }
  } else if (
    isLoadingAndNewUser[0] === false &&
    isLoadingAndNewUser[1] === true
  ) {
    SplashScreen.hide();
    return <AskNameScreen />;
  } else {
    return null;
  }
};

export default () => {
  const sessionPlaying = useSessionStore(state => state.sessionPlaying);
  return (
    <>
      {sessionPlaying ? <PlayMusic /> : null}
      <App />
    </>
  );
};
