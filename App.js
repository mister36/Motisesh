import React, {useEffect} from 'react';
// Importing Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';

// Stores
import {useAuthStore} from './src/zustand/store';

// Socket connection

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
import AuthOptionsScreen from './src/screens/AuthOptionsScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import ThinkScreen from './src/screens/ThinkScreen';
import ChatScreen from './src/screens/ChatScreen';
import StatsScreen from './src/screens/StatsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Components
import Header from './src/components/Header';

// Icons
import Bubble from './src/svgs/Bubble';
import Disk from './src/svgs/Disk';
import Home from './src/svgs/Home';
import User from './src/svgs/User';

import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

// Tab bar
import AnimatedTabBar from '@gorhom/animated-tabbar';

// Responsiveness
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// Splash Screen
import SplashScreen from 'react-native-splash-screen';

// Error tracking
import * as Sentry from '@sentry/react-native';
import shallow from 'zustand/shallow';

enableScreens(true);

Sentry.init({
  dsn:
    'https://08475c6e4f54468fb9bc371f33c6e960@o426850.ingest.sentry.io/5370182',
  enableAutoSessionTracking: true,
});

// Navigators

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// const MaterialTab = createMaterialTopTabNavigator();

// Building App Navigation

const tabs = {
  Home: {
    labelStyle: {
      color: '#E26452',
      fontFamily: 'Montserrat-SemiBold',
    },
    icon: {
      component: props => (
        <Entypo name="home" style={{fontSize: wp(6)}} {...props} />
      ),
      color: '#CACACA',
    },
    indicator: {
      visible: true,
    },
  },
  Chat: {
    labelStyle: {
      color: '#E26452',
      fontFamily: 'Montserrat-SemiBold',
    },
    icon: {
      component: props => (
        <FontAwesome5 name="robot" style={{fontSize: wp(6)}} {...props} />
      ),
      color: '#CACACA',
    },
    indicator: {
      visible: true,
    },
  },
  Profile: {
    labelStyle: {
      color: '#E26452',
      fontFamily: 'Montserrat-SemiBold',
    },
    icon: {
      component: props => (
        <MaterialCommunityIcons
          name="account"
          style={{fontSize: wp(7)}}
          {...props}
        />
      ),
      color: '#CACACA',
    },
    indicator: {
      visible: true,
    },
  },
};

const ChatNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'white',
          elevation: 0,
        },
        headerTitle: props => <Header {...props} />,
      }}>
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Think" component={ThinkScreen} />
    </Stack.Navigator>
  );
};

const TabNav = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'white'}}
      initialRouteName="Chat"
      tabBarOptions={{keyboardHidesTabBar: true}}
      tabBar={props => (
        <AnimatedTabBar tabs={tabs} preset="flashy" {...props} />
      )}>
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="Think" component={ThinkScreen} /> */}
      <Tab.Screen name="Chat" component={ChatNav} />
      {/* <Tab.Screen name="Stats" component={StatsScreen} /> */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const StackNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        cardStyle: {
          backgroundColor: '#FBFBFB',
        },
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
      }}>
      <Stack.Screen
        name="AuthOptions"
        component={AuthOptionsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

// App
const App = () => {
  // store
  const [token, saveToken] = useAuthStore(state => [
    state.token,
    state.saveToken,
  ]);
  // Sets up notifications
  const registerDevice = () => {
    // Request permissions on iOS, refresh token on Android
    Notifications.registerRemoteNotifications();

    // gets device token
    Notifications.events().registerRemoteNotificationsRegistered(event => {
      // console.log('Token received', event.deviceToken);
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

  useEffect(() => {
    registerDevice();
  }, []);

  // gets token from storage, save it
  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('accessToken');

        // TODO: Verify token
        // exits function
        if (!storedToken) return;

        saveToken(storedToken);
      } catch (error) {
        console.log(error);
      } finally {
        // removes splash screen
        SplashScreen.hide();
      }
    };
    checkToken();
  }, [token]);

  const myTheme = {
    dark: false,
    colors: {
      primary: '#E26452',
      background: 'white',
      card: '#E26452',
      text: '#E26452',
      border: '#E46B56',
      notification: 'E26452',
    },
  };

  return (
    <NavigationContainer theme={myTheme}>
      {!token ? <StackNav /> : <TabNav />}
    </NavigationContainer>
  );
};

export default () => {
  // const sessionPlaying = useSessionStore(state => state.sessionPlaying);
  return (
    <>
      {/* {sessionPlaying ? <PlayMusic /> : null} */}
      <App />
    </>
  );
};
