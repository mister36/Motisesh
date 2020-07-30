import * as React from 'react';
import {View} from 'react-native';
// Importing Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

// Providers and Context
import AuthContext, {AuthProvider} from './src/context/AuthContext';
import {SessionProvider} from './src/context/SessionContext';

// AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';

// Date and time
import date from 'date-and-time';

// App setup (saving videos)
// import RNFetchBlob from 'rn-fetch-blob';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import StatsScreen from './src/screens/StatsScreen';
import AskNameScreen from './src/screens/AskNameScreen';
import SessionScreen from './src/screens/SessionScreen';
import SessionPlayingScreen from './src/screens/SessionPlayingScreen';

// Responsiveness
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// Splash Screen
import SplashScreen from 'react-native-splash-screen';

// Icons
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn:
    'https://08475c6e4f54468fb9bc371f33c6e960@o426850.ingest.sentry.io/5370182',
  enableAutoSessionTracking: true,
});

// Navigators
const MainTabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const SessionStack = createStackNavigator();

// Building App Navigation
const BottomTabNav = () => {
  return (
    <MainTabs.Navigator
      tabBarOptions={{
        style: {
          height: hp(7),
          elevation: 0,
          borderTopWidth: 0,
        },
        activeTintColor: '#0E4958',
      }}>
      <MainTabs.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <SimpleLineIcons
                name="home"
                size={28}
                color={focused ? '#0E4958' : 'black'}
              />
            );
          },
        }}
        name="Home"
        component={HomeScreen}
      />
      <MainTabs.Screen
        name="Session"
        component={SessionScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <EvilIcons
                name="play"
                size={48}
                color={focused ? '#0E4958' : 'black'}
              />
            );
          },
        }}
      />
      <MainTabs.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <SimpleLineIcons
                name="chart"
                size={30}
                color={focused ? '#0E4958' : 'black'}
              />
            );
          },
        }}
      />
    </MainTabs.Navigator>
  );
};

// Needed for animation between tabs and music player
const MusicStackNav = () => {
  return (
    <SessionStack.Navigator
      initialRouteName="Main Tabs"
      screenOptions={{mode: 'modal', headerShown: false}}>
      <SessionStack.Screen name="Main Tabs" component={BottomTabNav} />
      <SessionStack.Screen
        name="Music"
        component={SessionPlayingScreen}
        options={{
          gestureEnabled: true,
          gestureDirection: 'vertical',
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 200,
              },
            },
            close: {animation: 'timing', config: {duration: 200}},
          },
        }}
      />
    </SessionStack.Navigator>
  );
};

const DrawerNav = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={MusicStackNav} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

// App
const App = () => {
  const {state, setName} = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(true);

  // checks for name in storage to know whether to render Home or not
  React.useEffect(() => {
    const checkForName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        if (storedName) {
          setName(storedName);
          setIsLoading(false);
        } else {
          const today = date.format(new Date(), 'MMM DD YYYY');
          const initial = {
            [today]: [{category: 'workout'}, {category: 'general'}],
            'Jun 20 2020': [{category: 'workout'}, {category: 'chores'}],
          }; // allows variable to be used in object

          await AsyncStorage.setItem('sessionInfo', JSON.stringify(initial));

          setIsLoading(false);
        }
      } catch (error) {
        console.log('check name error: ', error);
      }
    };
    checkForName();
  }, []);

  if (state.name && !isLoading) {
    try {
      return (
        <NavigationContainer>
          <DrawerNav />
        </NavigationContainer>
      );
    } finally {
      SplashScreen.hide();
    }
  } else if (!isLoading) {
    SplashScreen.hide();
    return <AskNameScreen />;
  } else {
    return null;
  }
};

export default () => {
  return (
    <AuthProvider>
      <SessionProvider>
        <App />
      </SessionProvider>
    </AuthProvider>
  );
};
