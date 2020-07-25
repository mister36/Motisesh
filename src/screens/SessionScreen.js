import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';

// Permission
import {
  requestDownloadPermission,
  requestReadFilePermission,
} from '../utils/permissions';

// Components
import SessionsLeftCircle from '../components/SessionsLeftCircle';

// Context
import SessionContext from '../context/SessionContext';

import AsyncStorage from '@react-native-community/async-storage';
import date from 'date-and-time';

// Styling
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import SwitchSelector from 'react-native-switch-selector';

const SessionScreen = () => {
  // Refs
  const excitedIcon = React.useRef('excitedIcon');
  const liftIcon = React.useRef('liftIcon');
  const sweepIcon = React.useRef('sweepIcon');
  // State
  const [completed, setCompleted] = React.useState(-1);

  const switchOptions = [
    {
      label: 'General',
      value: '0',
      customIcon: (
        <Image
          source={require('../assets/icons/excited_icon.png')}
          style={{height: wp(5), width: wp(5), marginRight: wp(1)}}
          ref={excitedIcon}
          tintColor="#FFFFFF" //Set to white at first since this is default
        />
      ),
    },
    {
      label: 'Workout',
      value: '1',
      customIcon: (
        <Image
          source={require('../assets/icons/lift_icon.png')}
          style={{height: wp(5), width: wp(5), marginRight: wp(1)}}
          ref={liftIcon}
        />
      ),
    },
    {
      label: 'Chores',
      value: '2',
      customIcon: (
        <Image
          source={require('../assets/icons/sweep_icon.png')}
          style={{height: wp(5), width: wp(5), marginRight: wp(1)}}
          ref={sweepIcon}
        />
      ),
    },
  ];

  // Used to change the color of each icon between black & white in SwitchSelector. Not using setState since that would cause entire screen to rerender, reducing performance
  const setImageColors = selectedNum => {
    switch (parseInt(selectedNum, 10)) {
      case 0:
        excitedIcon.current.setNativeProps({tintColor: '#FFFFFF'});
        liftIcon.current.setNativeProps({tintColor: '#000000'});
        sweepIcon.current.setNativeProps({tintColor: '#000000'});
        break;
      case 1:
        liftIcon.current.setNativeProps({tintColor: '#FFFFFF'});
        excitedIcon.current.setNativeProps({tintColor: '#000000'});
        sweepIcon.current.setNativeProps({tintColor: '#000000'});
        break;
      case 2:
        sweepIcon.current.setNativeProps({tintColor: '#FFFFFF'});
        excitedIcon.current.setNativeProps({tintColor: '#000000'});
        liftIcon.current.setNativeProps({tintColor: '#000000'});
        break;
    }
  };

  // Ask for access to storage
  requestDownloadPermission(requestReadFilePermission);

  React.useEffect(() => {
    // Calculate amount of sessions left
    const calcSessions = async () => {
      try {
        let sessions = await AsyncStorage.getItem('sessionInfo');
        sessions = JSON.parse(sessions);

        const today = sessions[date.format(new Date(), 'MMM DD YYYY')];

        // if there are no logged sessions for today, set completed === 0
        today ? setCompleted(today.length) : setCompleted(2); // TODO setCompleted(0)
      } catch (error) {
        console.error(error);
      }
    };
    calcSessions();
  }, []);

  return (
    <LinearGradient
      colors={['#F59C75', '#E24D37']}
      end={{x: 0.5, y: 0.7}}
      style={styles.container}>
      <View style={styles.topRow}>
        {/* Background Circle */}
        {completed !== -1 ? (
          <SessionsLeftCircle
            svgSide={wp(40)}
            radius={wp(12)}
            completed={completed}
          />
        ) : null}
      </View>

      <View style={styles.bottomView}>
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          style={{paddingBottom: hp(6)}}>
          <Text style={styles.bottomViewHeader}>Start a new session!</Text>
          <View style={styles.category}>
            <Text style={styles.categoryHeader}>Category</Text>
            <SwitchSelector
              options={switchOptions}
              initial={0}
              onPress={value => {
                setImageColors(value);
              }}
              buttonColor="#D15621"
              selectedTextStyle={styles.switchSelectedText}
              textStyle={styles.switchText}
              style={styles.switchContainer}
              // backgroundColor="#F3F3F3"
            />
          </View>
        </ScrollView>
        <Pressable style={styles.beginButton}>
          <Text style={styles.beginButtonText}>BEGIN</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    backgroundColor: '#F47F4D',
    // backgroundColor: '#E7803D',
  },
  bottomView: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: hp(7),
    borderTopRightRadius: hp(7),
    height: hp(70),
    width: wp(100),
    marginTop: 'auto',
    elevation: 10,
  },
  topRow: {
    marginTop: hp(1),
  },
  contentContainerStyle: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  beginButton: {
    width: wp(90),
    backgroundColor: '#27C2C6',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(5),
    borderRadius: 5,
    alignSelf: 'center',
    position: 'absolute',
    bottom: hp(14),
  },
  beginButtonText: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: wp(6),
    color: '#FFFFFF',
  },
  bottomViewHeader: {
    fontFamily: 'Lato-Bold',
    fontSize: wp(6),
    marginTop: hp(3.5),
    marginLeft: wp(10),
    // color: '#CA2121',
  },
  category: {
    marginTop: hp(3),
  },
  categoryHeader: {
    fontFamily: 'Lato-Bold',
    fontSize: wp(5),
    marginLeft: wp(10),
    marginBottom: hp(1),
    color: '#D15621',
  },
  switchContainer: {
    width: wp(82),
    alignSelf: 'center',
  },
  switchSelectedText: {fontFamily: 'NunitoSans-Bold', fontSize: wp(4.5)},
  switchText: {
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: wp(4.3),
  },
});

export default SessionScreen;
