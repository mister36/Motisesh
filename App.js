import * as React from 'react';
// Importing Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AnimatedTabBar from '@gorhom/animated-tabbar';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Stores
import {useSessionStore, useAuthStore} from './src/zustand/store';

// Notifications
import {Notifications} from 'react-native-notifications';

// Music playback
import PlayMusic from './playMusic';

// AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';

// Date and time
import date from 'date-and-time';

// Animation
import Animated from 'react-native-reanimated';

// Device info
import DeviceInfo from 'react-native-device-info';

// Native screen support
import {enableScreens} from 'react-native-screens';

// Screens
import SettingsScreen from './src/screens/SettingsScreen';
import StatsScreen from './src/screens/StatsScreen';
import AskNameScreen from './src/screens/AskNameScreen';
import SessionScreen from './src/screens/SessionScreen';

// Icons
import Bubble from './src/svgs/Bubble';
import Disk from './src/svgs/Disk';
import Home from './src/svgs/Home';
import User from './src/svgs/User';

import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';

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
import HomeScreen from './src/screens/HomeScreen';
import MotiMessageScreen from './src/screens/MotiMessageScreen';

enableScreens(true);

Sentry.init({
  dsn:
    'https://08475c6e4f54468fb9bc371f33c6e960@o426850.ingest.sentry.io/5370182',
  enableAutoSessionTracking: true,
});

// Animatable Icons
const FontistoAnim = Animated.createAnimatedComponent(Fontisto);
const MaterialCommunityIconsAnim = Animated.createAnimatedComponent(
  MaterialCommunityIcons,
);
const FoundationAnim = Animated.createAnimatedComponent(Foundation);

// Navigators

const tabs = {
  Home: {
    labelStyle: {
      color: 'white',
      fontFamily: 'GalanoGrotesque-SemiBold',
    },
    icon: {
      component: props => <Home {...props} />,
      activeColor: 'rgb(255, 255, 255)',
      inactiveColor: 'rgb(71, 71, 71)',
    },
    background: {
      activeColor: '#FF6F61',
      inactiveColor: 'white',
    },
  },
  Session: {
    labelStyle: {
      color: 'white',
      fontFamily: 'GalanoGrotesque-SemiBold',
    },
    icon: {
      component: props => <Disk {...props} />,
      activeColor: 'rgb(255, 255, 255)',
      inactiveColor: 'rgb(71, 71, 71)',
    },
    background: {
      activeColor: '#FF6F61',
      inactiveColor: '#white',
    },
  },
  MotiMessage: {
    labelStyle: {
      color: 'white',
      fontFamily: 'GalanoGrotesque-SemiBold',
    },
    icon: {
      component: props => <Bubble {...props} />,
      activeColor: 'rgb(255, 255, 255)',
      inactiveColor: 'rgb(71, 71, 71)',
    },
    background: {
      activeColor: '#FF6F61',
      inactiveColor: '#white',
    },
  },
  Profile: {
    labelStyle: {
      color: 'white',
      fontFamily: 'GalanoGrotesque-SemiBold',
    },
    icon: {
      component: props => <User {...props} />,
      activeColor: 'rgb(255, 255, 255)',
      inactiveColor: 'rgb(71, 71, 71)',
    },
    background: {
      activeColor: '#FF6F61',
      inactiveColor: '#white',
    },
  },
};

const Tab = createBottomTabNavigator();

const MaterialTab = createMaterialTopTabNavigator();

// Building App Navigation
const TabNav = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'white'}}
      tabBarOptions={{
        style: {
          elevation: 3,
          borderRadius: wp(12),
        },
      }}
      tabBar={props => <AnimatedTabBar tabs={tabs} {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Session" component={SessionScreen} />
      <Tab.Screen name="MotiMessage" component={MotiMessageScreen} />
      <Tab.Screen name="Profile" component={SettingsScreen} />
    </Tab.Navigator>
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

  // Sets up notifications
  const registerDevice = () => {
    // Request permissions on iOS, refresh token on Android
    Notifications.registerRemoteNotifications();

    // gets device token
    Notifications.events().registerRemoteNotificationsRegistered(event => {
      console.log('Token received', event.deviceToken);
    });

    // If receiving token failed
    Notifications.events().registerRemoteNotificationsRegistrationFailed(
      event => {
        console.error(event);
      },
    );

    // Receiving notifications in foreground
    Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        console.log('Notification Received - Foreground', notification.payload);

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, sound: true, badge: false});
      },
    );

    // Whe user opens notification
    Notifications.events().registerNotificationOpened(
      (notification, completion) => {
        // console.log("Notification opened by device user", notification.payload);
        // console.log(`Notification opened with an action identifier: ${action.identifier} and response text: ${action.text}`);
        completion();
      },
    );

    // Receiving notifications in background
    Notifications.events().registerNotificationReceivedBackground(
      (notification, completion) => {
        console.log('Notification Received - Background', notification.payload);

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, sound: true, badge: false});
      },
    );
  };

  React.useEffect(() => {
    registerDevice();
  }, []);

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
          <TabNav />
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
