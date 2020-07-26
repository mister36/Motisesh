import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  // Animated,
} from 'react-native';

// Permission
import {
  requestDownloadPermission,
  requestReadFilePermission,
} from '../utils/permissions';

// Motion
import Animated, {
  Easing,
  Clock,
  Value,
  set,
  cond,
  startClock,
  clockRunning,
  timing,
  debug,
  stopClock,
  block,
} from 'react-native-reanimated';

// Components
import SessionsLeftCircle from '../components/SessionsLeftCircle';
import Slider from '@react-native-community/slider';

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

// Utils
import {decToMin} from '../utils/getStats';

// Code needed for screen
const SessionScreen = ({navigation}) => {
  // Context
  const {state: sessState, sessionPlaying} = React.useContext(SessionContext);
  // Refs
  const switchRef = React.useRef('switchRef');
  const excitedIcon = React.useRef('excitedIcon');
  const liftIcon = React.useRef('liftIcon');
  // State
  const [completed, setCompleted] = React.useState(-1);
  const [duration, setDuration] = React.useState(1);
  const [descriptionText, setDescriptionText] = React.useState(0);
  // Animation with Reanimated
  const buttonBorder = new Value(0);
  const buttonConfig = {
    duration: 500,
    toValue: hp(2.5),
    easing: Easing.inOut(Easing.ease),
  };
  const buttonAnim = timing(buttonBorder, buttonConfig);

  const bottomViewY = new Value(0);
  const bottomViewConfig = {
    duration: 700,
    toValue: hp(70),
    easing: Easing.inOut(Easing.ease),
  };
  const bottomViewAnim = timing(bottomViewY, bottomViewConfig);

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  // Content for the switch selector
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
  ];
  // Used to change the color of each icon between black & white in SwitchSelector. Not using setState since that would cause entire screen to rerender, reducing performance
  const setImageColors = selectedNum => {
    switch (parseInt(selectedNum, 10)) {
      case 0:
        excitedIcon.current.setNativeProps({tintColor: '#FFFFFF'});
        liftIcon.current.setNativeProps({tintColor: '#000000'});
        // sweepIcon.current.setNativeProps({tintColor: '#000000'});
        break;
      case 1:
        liftIcon.current.setNativeProps({tintColor: '#FFFFFF'});
        excitedIcon.current.setNativeProps({tintColor: '#000000'});
        // sweepIcon.current.setNativeProps({tintColor: '#000000'});
        break;
      case 2:
        // sweepIcon.current.setNativeProps({tintColor: '#FFFFFF'});
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
            style={styles.sessionsLeftCircle}
          />
        ) : null}
      </View>

      <Animated.View
        style={[styles.bottomView, {transform: [{translateY: bottomViewY}]}]}>
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
                // Changes text below and sets selected icon image to white
                setDescriptionText(value);
                setImageColors(value);
              }}
              buttonColor="#D15621"
              selectedTextStyle={styles.switchSelectedText}
              textStyle={styles.switchText}
              style={styles.switchContainer}
              ref={switchRef}
            />

            <View style={styles.descriptionBox}>
              {parseInt(descriptionText, 10) === 0 ? (
                <Text style={styles.descriptionText}>
                  For those random times you need a dose of motivation.
                </Text>
              ) : (
                <Text style={styles.descriptionText}>
                  When getting hyped at the gym is a requirement.
                </Text>
              )}
            </View>
          </View>

          <View style={styles.duration}>
            <Text style={styles.durationHeader}>Duration</Text>

            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={5}
              value={duration}
              minimumTrackTintColor="#0A3641"
              maximumTrackTintColor="#484D4E"
              step={0.5}
              thumbTintColor="#0A3641"
              onSlidingComplete={setDuration}
            />
            <Text style={styles.durationNumber}>{decToMin(duration)}</Text>
          </View>
        </ScrollView>
        <AnimatedPressable
          style={[
            styles.beginButton,
            {borderColor: '#CA2121', borderWidth: buttonBorder},
          ]}
          onPress={() => {
            console.log(switchRef.current.state.selected);
            buttonAnim.start(data => {
              if (data.finished) {
                bottomViewAnim.start();
              }
            });
          }}>
          <Text style={styles.beginButtonText}>BEGIN</Text>
        </AnimatedPressable>
      </Animated.View>
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
    borderRadius: hp(2.5),
    alignSelf: 'center',
    position: 'absolute',
    bottom: hp(14),
    elevation: 5,
    // borderWidth: hp(2.5),
    // borderColor: '#CA2121',
  },
  beginButtonText: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: wp(6),
    color: '#FFFFFF',
  },
  sessionsLeftCircle: {
    marginRight: wp(9),
  },
  bottomViewHeader: {
    fontFamily: 'Lato-Bold',
    fontSize: wp(6),
    marginTop: hp(3.5),
    marginLeft: wp(10),
    // color: '#CA2121',
  },
  category: {
    marginTop: hp(4),
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
  descriptionBox: {
    width: wp(82),
    alignSelf: 'center',
    marginTop: hp(1),
  },
  descriptionText: {
    alignSelf: 'center',
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: wp(4.5),
  },
  duration: {
    marginTop: hp(6),
  },
  durationHeader: {
    fontFamily: 'Lato-Bold',
    fontSize: wp(5),
    marginLeft: wp(10),
    marginBottom: hp(1),
    color: '#D15621',
  },
  slider: {
    width: wp(82),
    alignSelf: 'center',
    marginTop: hp(1),
  },
  durationNumber: {
    fontFamily: 'NunitoSans-Bold',
    alignSelf: 'flex-end',
    marginRight: wp(13),
    fontSize: wp(5.5),
  },
});

export default SessionScreen;
