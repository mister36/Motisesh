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

// Motion
import Animated, {Easing, Value, timing} from 'react-native-reanimated';

// Components
import SessionsLeftCircle from '../components/SessionsLeftCircle';
import Slider from '@react-native-community/slider';

// Context
import SessionContext from '../context/SessionContext';

// Checking storage
import AsyncStorage from '@react-native-community/async-storage';
import date from 'date-and-time';

// Caching animations
import {useMemoOne} from 'use-memo-one';

// Icons
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
  const {buttonBorder} = useMemoOne(
    () => ({
      buttonBorder: new Value(0),
    }),
    [],
  );
  const buttonConfig = {
    duration: 500,
    toValue: hp(2.5),
    easing: Easing.inOut(Easing.ease),
  };
  const buttonAnim = timing(buttonBorder, buttonConfig);

  const {bottomViewY} = useMemoOne(
    () => ({
      bottomViewY: new Value(0),
    }),
    [],
  );
  const bottomViewConfig = {
    duration: 700,
    toValue: hp(70),
    easing: Easing.inOut(Easing.ease),
  };
  const bottomViewAnim = timing(bottomViewY, bottomViewConfig);

  const {gradientFade} = useMemoOne(
    () => ({
      gradientFade: new Value(1),
    }),
    [],
  );
  const gradientFadeConfig = {
    duration: 400,
    toValue: 0,
    easing: Easing.inOut(Easing.ease),
  };
  const gradientFadeAnim = timing(gradientFade, gradientFadeConfig);

  // Creating Animatable components
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

  //! The first linear gradient is the one that will be shown during a cheer session. When the session begins, the nested linear gradient will fade out

  //!The first nested Animated.View will be the one shown during a cheer session
  return (
    <LinearGradient colors={['#8D2626', '#6E2E2E']} style={{flex: 1}}>
      {/* WHAT THE USER SEES WHEN SESSION PLAYING */}
      <Animated.View style={styles.periSessionAnimatedContainer}>
        <Animated.Image
          source={require('../assets/images/logo.png')}
          style={[
            styles.centerLogo,
            {
              transform: [
                {
                  scale: gradientFade.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1.5, 1],
                  }),
                },
              ],
            },
          ]}
        />
        <Pressable style={styles.playPauseButton}>
          {!sessState.sessionPlaying ? (
            <Entypo name="controller-play" style={styles.playIcon} />
          ) : (
            <MaterialIcons name="pause" style={styles.playIcon} />
          )}
        </Pressable>
      </Animated.View>

      {/* FIRST THING THE USER SEES */}
      <Animated.View
        style={[
          styles.preSessionAnimatedContainer,
          {
            opacity: gradientFade,

            transform: [
              {
                translateY: gradientFade.interpolate({
                  inputRange: [0, 0.001, 1],
                  outputRange: [hp(100), hp(0), hp(0)],
                }),
              },
            ],
          },
        ]}>
        <LinearGradient
          colors={['rgb(245, 156, 117)', 'rgb(226, 77, 55)']}
          end={{x: 0.5, y: 0.7}}
          style={styles.preSessionGradientContainer}>
          <Animated.View
            style={[
              styles.topRow,
              {
                opacity: bottomViewY.interpolate({
                  inputRange: [0, hp(35), hp(70)],
                  outputRange: [1, 1, 0],
                }),
                transform: [
                  {
                    translateY: bottomViewY.interpolate({
                      inputRange: [0, hp(35), hp(69), hp(70)],
                      outputRange: [0, 0, hp(20), hp(100)],
                    }),
                  },
                ],
              },
            ]}>
            {/* Background Circle */}
            {completed !== -1 ? (
              <SessionsLeftCircle
                svgSide={wp(40)}
                radius={wp(12)}
                completed={completed}
                style={[styles.sessionsLeftCircle]}
              />
            ) : null}
          </Animated.View>

          <Animated.View
            style={[
              styles.bottomView,
              {
                transform: [{translateY: bottomViewY}],
                opacity: bottomViewY.interpolate({
                  inputRange: [0, hp(70)],
                  outputRange: [1, 0],
                }),
              },
            ]}>
            <ScrollView
              contentpreSessionGradientContainerStyle={
                styles.contentpreSessionGradientContainerStyle
              }
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
                  style={styles.switchpreSessionGradientContainer}
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
            {/* Blue button at the botto */}
            <AnimatedPressable
              style={[
                styles.beginButton,
                {borderColor: '#CA2121', borderWidth: buttonBorder},
              ]}
              onPress={() => {
                console.log(switchRef.current.state.selected);
                buttonAnim.start(data => {
                  if (data.finished) {
                    bottomViewAnim.start(data => {
                      if (data.finished) {
                        gradientFadeAnim.start();
                      }
                    });
                  }
                });
              }}>
              <Text style={styles.beginButtonText}>BEGIN</Text>
            </AnimatedPressable>
          </Animated.View>
        </LinearGradient>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  preSessionAnimatedContainer: {
    position: 'absolute',
  },
  preSessionGradientContainer: {
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
  contentpreSessionGradientContainerStyle: {
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
  switchpreSessionGradientContainer: {
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
  periSessionAnimatedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  centerLogo: {
    position: 'absolute',
    top: hp(30),
    width: wp(30),
    height: wp(35.1),
  },
  playPauseButton: {
    position: 'absolute',
    bottom: hp(15),
  },
  playIcon: {
    fontSize: wp(28),
    color: '#FFFFFF',
  },
});

export default SessionScreen;
