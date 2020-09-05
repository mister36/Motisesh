import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Platform,
  StatusBar,
  // ScrollView,
} from 'react-native';

// Permission
import {requestStoragePermission} from '../utils/permissions';

// Motion
import Animated, {
  Easing,
  Clock,
  Value,
  set,
  cond,
  startClock,
  // clockRunning,
  timing,
  // debug,
  stopClock,
  block,
  // not,
  // spring,
  // divide,
  // diff,
  // greaterThan,
  useCode,
  // sub,
  // add,
  // eq,
  // call,
  interpolate,
} from 'react-native-reanimated';

// Components
import SessionAnimation from '../components/SessionAnimation';
import WaveForm from '../components/Waveform';
import StopSessionButton from '../components/StopSessionButton';

// Store
import shallow from 'zustand/shallow';
import {useSessionStore} from '../zustand/store';

// Checking storage
import AsyncStorage from '@react-native-community/async-storage';
import date from 'date-and-time';

// Caching animations
import {useMemoOne} from 'use-memo-one';

// Redash
import {loop, delay, timing as timingDash, useValue} from 'react-native-redash';

// Icons
import Foundation from 'react-native-vector-icons/Foundation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

// Components
import SessionNav from '../components/SessionNav';

// Styling
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

// Lottie animations
import LottieView from 'lottie-react-native';

// Sound
import Video from 'react-native-video';

// Utils
import {decToMin} from '../utils/getStats';

// Dancing flame animation
const dancingFlame = require('../assets/animations/dancing_flame.json');

const whooshSound = require('../assets/sound/whoosh.mp3');

const SessionScreen = ({navigation}) => {
  // storage
  const [
    sessionPlaying,
    sessionPaused,
    shouldSessionRun,
    shouldSessionPause,
  ] = useSessionStore(
    state => [
      state.sessionPlaying,
      state.sessionPaused,
      state.shouldSessionRun,
      state.shouldSessionPause,
    ],
    shallow,
  );

  // State
  const [completed, setCompleted] = React.useState(-1);
  const [userTapped, setUserTapped] = React.useState(false);

  // Ask for access to storage if user is new
  React.useEffect(() => {
    const checkIfNewUser = async () => {
      try {
        const externalStoragePermission = await AsyncStorage.getItem(
          'external_storage_permission',
        );

        if (!externalStoragePermission) {
          await requestStoragePermission();
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkIfNewUser();
  }, []);

  // Animated background
  const animatedBackground = require('../assets/animations/session_background.json');

  // pulse for button pulse, headerSlideVal for sliding header, linearSlideVal for disappearing linear gradient, periLogoScaleVal for the scale increase of logo during session
  const {
    pulse,
    headerSlideVal,
    buttonShrinkVal,
    periLogoScaleVal,
    periLogoOpacityVal,
    periLogoBounceVal,
    animatedBackgroundOpacity,
  } = useMemoOne(
    () => ({
      pulse: new Value(0),
      headerSlideVal: new Value(0),
      buttonShrinkVal: new Value(1),
      periLogoScaleVal: new Value(1),
      periLogoOpacityVal: new Value(0.5),
      periLogoBounceVal: new Value(0),
      animatedBackgroundOpacity: new Value(0),
    }),
    [],
  );

  // !Code needed for button pulse effect
  useCode(
    () =>
      set(
        pulse,
        loop({
          clock: new Clock(),
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          boomerang: true,
          autoStart: true,
        }),
      ),
    [pulse],
  );

  // Header slide animation
  const headerSlideAnim = timing(headerSlideVal, {
    duration: 200,
    toValue: new Value(1),
    easing: Easing.linear,
  });

  // Main button shrink animation
  const buttonShrinkAnim = timing(buttonShrinkVal, {
    duration: 300,
    toValue: new Value(0.6),
    easing: Easing.linear,
  });

  // PeriLogo glow effect
  useCode(() =>
    set(
      periLogoOpacityVal,
      loop({
        clock: new Clock(),
        duration: 1000,
        easing: Easing.linear,
        boomerang: true,
      }),
    ),
  );

  // Peri logo bounce effect
  useCode(
    () =>
      set(
        periLogoBounceVal,
        loop({
          clock: new Clock(),
          duration: 700,
          easing: Easing.linear,
          boomerang: true,
        }),
      ),
    [periLogoBounceVal],
  );

  // Animated background fade in
  const runAnimatedBackgroundFade = () => {
    const clock = new Clock();

    const state = {
      finished: new Value(0),
      position: animatedBackgroundOpacity,
      time: new Value(0),
      frameTime: new Value(0),
    };

    const config = {
      duration: new Value(800),
      toValue: new Value(1),
      easing: Easing.inOut(Easing.linear),
    };

    return block([
      startClock(clock),
      timing(clock, state, config),
      state.position,
    ]);
  };

  // Bottom header flip animation
  const runHeaderAnim = () => {
    const clock = new Clock();

    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0),
    };

    const config = {
      duration: new Value(8000),
      toValue: new Value(1),
      easing: Easing.inOut(Easing.linear),
    };

    return block([
      startClock(clock),

      timing(clock, state, config),

      cond(state.finished, [
        stopClock(clock),

        set(state.finished, 0),

        set(state.position, 0),

        set(state.time, 0),
        set(state.frameTime, 0),

        startClock(clock),
      ]),
      state.position,
    ]);
  };
  const headerPosition = runHeaderAnim();

  // PeriLogo scale increase animation
  const periLogoScaleAnim = timing(periLogoScaleVal, {
    duration: 300,
    toValue: new Value(1.2),
    easing: Easing.linear,
  });

  return (
    <Animated.View style={[styles.mainContainer]}>
      <StatusBar backgroundColor="black" />
      {/* //!Animated background when session is playing */}
      {sessionPlaying ? (
        <Animated.View
          style={[
            styles.animatedBackground,
            {opacity: runAnimatedBackgroundFade()},
          ]}>
          <LottieView
            source={animatedBackground}
            autoPlay
            speed={2.5}
            style={{height: hp(100)}}
          />
        </Animated.View>
      ) : null}

      {/* //! Linear Gradient background when session isn't playing */}
      <LinearGradient
        colors={['#E26452', '#F59C75']}
        end={{x: 0.5, y: 1}}
        style={[styles.preSessionGradientContainer]}>
        <SessionNav navigation={navigation} />
        {/* //!Dancing flame */}
        {userTapped ? (
          <LottieView
            source={dancingFlame}
            autoPlay
            loop={false}
            duration={1000}
            style={styles.dancingFlame}
            onAnimationFinish={() => {
              setUserTapped(false);
              buttonShrinkAnim.start(data => {
                if (data.finished) {
                  shouldSessionRun();
                  periLogoScaleAnim.start();
                }
              });
            }}
          />
        ) : null}
        {/* //!Dancing flame sound */}
        {userTapped ? (
          <Video source={whooshSound} audioOnly rate={1.5} />
        ) : null}

        {/* //! View that contains button and image hiding underneath */}
        <Animated.View
          onStartShouldSetResponder={() =>
            console.log('center content presseds')
          }
          style={[styles.centerContentContainer]}>
          {!sessionPlaying ? (
            // !Big Button
            <Animated.View
              style={[
                styles.bigButtonContainer,
                {
                  // backgroundColor: 'green',
                  opacity: buttonShrinkVal.interpolate({
                    inputRange: [0.6, 1],
                    outputRange: [0, 1],
                  }),
                  transform: [
                    {
                      scale: !userTapped
                        ? pulse.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.1],
                          })
                        : buttonShrinkVal,
                    },
                  ],
                },
              ]}>
              <Pressable
                onPress={() => {
                  setUserTapped(true);
                  headerSlideAnim.start();
                }}
                style={[styles.bigButton]}>
                <Image
                  source={require('../assets/images/white-logo.png')}
                  style={styles.logo}
                />
              </Pressable>
            </Animated.View>
          ) : null}

          {/* //! Image under button, shown during session */}
          <Animated.Image
            source={require('../assets/images/white-logo.png')}
            style={[
              styles.logo,
              styles.periLogo,
              {
                transform: [
                  {
                    scale: periLogoScaleVal,
                  },
                  {
                    translateY: periLogoBounceVal.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, hp(3)],
                    }),
                  },
                ],
              },
            ]}
          />
        </Animated.View>

        {sessionPlaying ? (
          <>
            <WaveForm style={{position: 'absolute', top: hp(20), zIndex: 7}} />
          </>
        ) : null}

        {sessionPlaying && !sessionPaused ? <SessionAnimation /> : null}
        {/* <SessionAnimation /> */}

        <Animated.View style={styles.selectorContainer}>
          <Animated.View style={styles.selectionBox}>
            <Text style={styles.askToSelectText}>Choose a Moti Session!</Text>
            <SimpleLineIcons name="arrow-down" style={styles.downIcon} />
          </Animated.View>
        </Animated.View>

        {/* //! Pause and play button */}
        {sessionPlaying && !sessionPaused ? (
          <Foundation
            name="pause"
            style={styles.playPauseIcon}
            onPress={() => {
              shouldSessionPause(true);
            }}
          />
        ) : null}

        {sessionPlaying && sessionPaused ? (
          <Foundation
            name="play"
            style={styles.playPauseIcon}
            onPress={() => {
              shouldSessionPause(false);
            }}
          />
        ) : null}

        {/* //! Stop session button */}
        {sessionPlaying ? (
          <StopSessionButton style={styles.stopSessionButton} />
        ) : null}
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: wp(100),
  },
  preSessionGradientContainer: {
    height: hp(100),
  },
  logo: {
    height: wp(44.545), // w:h = 6:7
    width: wp(38.182),
    alignSelf: 'center',
  },
  headerContainer: {
    position: 'absolute',
    bottom: hp(20),
    alignItems: 'center',
    alignSelf: 'center',
    height: hp(5),
    overflow: 'hidden',
    zIndex: 8.5,
  },
  header: {
    fontSize: wp(7),
    fontFamily: 'NunitoSans-Bold',
    color: 'white',
  },
  centerContentContainer: {
    // borderWidth: 2,
    position: 'absolute',
    top: hp(28),
    zIndex: 7.1,
    alignSelf: 'center',
    height: wp(65),
    width: wp(65),
    justifyContent: 'center',
    // backgroundColor: 'green',
  },
  bigButtonContainer: {
    // backgroundColor: '#DE5642',
    position: 'absolute',
    zIndex: 12,
    // height: wp(65),
    // width: wp(65),
    borderRadius: wp(32.5),
    elevation: 9,
    alignSelf: 'center',
    justifyContent: 'center',
    // zIndex: 10,
  },
  bigButton: {
    borderRadius: wp(30),
    justifyContent: 'center',
    // zIndex: 12,
    // elevation: 9,
    height: wp(60),
    width: wp(60),
    backgroundColor: '#DE5642',
    // borderWidth: 2,
    // elevation: 9,
  },
  periLogo: {
    // position: 'absolute',
    // top: hp(33),
    zIndex: 5,
    // width: 300,
    // transform: [{scale: 0.9}],
  },
  selectorContainer: {
    height: hp(10),
    width: wp(80),
    // borderWidth: 1,
    position: 'absolute',
    bottom: hp(25),
    alignSelf: 'center',
  },
  selectionBox: {
    borderColor: '#FFFFFF',
    borderRadius: 5,
    // borderWidth: 2,
    width: wp(80),
    backgroundColor: 'rgba(255, 255, 255, .1)',
  },
  askToSelectText: {
    fontFamily: 'Lato-Black',
    fontSize: wp(6.5),
    marginTop: hp(1),
    color: '#FFFFFF',
    textAlign: 'center',
  },
  downIcon: {
    fontSize: wp(9),
    alignSelf: 'center',
    marginTop: hp(1),
    color: '#FFFFFF',
  },
  dancingFlame: {
    zIndex: 13,
    height: hp(50),
    position: 'absolute',
    top: hp(10),
    alignSelf: 'center',
  },
  playPauseIcon: {
    position: 'absolute',
    bottom: hp(15),
    fontSize: wp(25),
    alignSelf: 'center',
    color: '#FFFFFF',
    zIndex: 12,
  },
  stopSessionButton: {
    position: 'absolute',
    top: hp(18),
    alignSelf: 'flex-end',
    right: wp(5),
    zIndex: 13,
  },
  animatedBackground: {position: 'absolute', zIndex: 7, height: hp(100)},
});

export default SessionScreen;
