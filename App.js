import 'react-native-gesture-handler';
import * as React from 'react';
// Importing Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Providers and Context
import AuthContext, {AuthProvider} from './src/context/AuthContext';
import {SessionProvider} from './src/context/SessionContext';

// AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';

// Date and time
import date from 'date-and-time';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AskNameScreen from './src/screens/AskNameScreen';
import SessionScreen from './src/screens/SessionScreen';

// Splash Screen
import SplashScreen from 'react-native-splash-screen';

// Icons
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Navigators
const MainTabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Building App Navigation
const BottomTabNav = () => {
  return (
    <MainTabs.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          elevation: 0,
          borderTopWidth: 0,
        },
        activeTintColor: '#0E4958',
      }}>
      <MainTabs.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Entypo
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
              <FontAwesome
                name="play"
                size={28}
                color={focused ? '#0E4958' : 'black'}
              />
            );
          },
        }}
      />
    </MainTabs.Navigator>
  );
};

const DrawerNav = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={BottomTabNav} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

// App
const App = () => {
  const {state, setName} = React.useContext(AuthContext);

  // checks for name in storage to know whether to render Home or not
  React.useEffect(() => {
    const checkForName = async cal => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        if (storedName) {
          setName(storedName);
          cal();
        } else {
          const today = date.format(new Date(), 'MMM DD YYYY');
          const initial = {
            [today]: [{category: 'workout'}, {category: 'general'}],
            'Jun 20 2020': [{category: 'workout'}, {category: 'chores'}],
          }; // allows variable to be used in object

          await AsyncStorage.setItem('sessionInfo', JSON.stringify(initial));
          cal();
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkForName(SplashScreen.hide);
  }, []);

  const isName = async () => {
    try {
      const value = await AsyncStorage.getItem('name');
      value != null ? true : false;
    } catch (error) {
      console.error(error);
    }
  };

  return isName() ? (
    <NavigationContainer>
      <DrawerNav />
    </NavigationContainer>
  ) : (
    <AskNameScreen />
  );
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
