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
import {requestStoragePermission} from '../utils/permissions';

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
  not,
  spring,
  divide,
  diff,
  greaterThan,
  useCode,
  sub,
  add,
  eq,
  call,
  interpolate,
} from 'react-native-reanimated';

import VIForegroundService from '@voximplant/react-native-foreground-service';

// Components
import SessionsLeftCircle from '../components/SessionsLeftCircle';

// Context
import SessionContext from '../context/SessionContext';

// Checking storage
import AsyncStorage from '@react-native-community/async-storage';
import date from 'date-and-time';

// Caching animations
import {useMemoOne} from 'use-memo-one';

// Redash
import {loop, delay, timing as timingDash} from 'react-native-redash';

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

const SessionScreen = ({navigation}) => {
  // Context
  const {state: sessState, sessionPlaying} = React.useContext(SessionContext);
  // State
  const [completed, setCompleted] = React.useState(-1);
  const [userTapped, setUserTapped] = React.useState(false);

  // Ask for access to storage
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

  // pulse for button pulse, headerSlideVal for sliding header, linearSlideVal for disappearing linear gradient, periLogoScaleVal for the scale increase of logo during session
  const {
    pulse,
    headerSlideVal,
    buttonShrinkVal,
    periLogoScaleVal,
    periLogoOpacityVal,
    periLogoBounceVal,
  } = useMemoOne(
    () => ({
      pulse: new Value(0),
      headerSlideVal: new Value(0),
      buttonShrinkVal: new Value(1),
      periLogoScaleVal: new Value(1),
      periLogoOpacityVal: new Value(0.5),
      periLogoBounceVal: new Value(0),
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
    [pulse, sessState.sessionPlaying],
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
  useCode(() =>
    set(
      periLogoBounceVal,
      loop({
        clock: new Clock(),
        duration: 700,
        easing: Easing.linear,
        boomerang: true,
      }),
    ),
  );

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
      {/* //!Linear gradient seen before session */}

      <LinearGradient
        colors={['#F59C75', '#E26452']}
        end={{x: 0.5, y: 0.7}}
        style={[styles.preSessionGradientContainer]}>
        {/* //!Lightning */}
        {userTapped ? (
          <LottieView
            source={require('../assets/animations/dancing_flame.json')}
            autoPlay
            loop={false}
            duration={800}
            style={{
              zIndex: 13,
              height: hp(30),
              position: 'absolute',
              top: hp(13),
              alignSelf: 'center',
            }}
            onAnimationFinish={() => {
              setUserTapped(false);
              buttonShrinkAnim.start(data => {
                if (data.finished) {
                  sessionPlaying(true);
                  periLogoScaleAnim.start();
                }
              });
            }}
          />
        ) : null}
        {userTapped ? (
          <Video
            source={require('../assets/sound/whoosh.wav')}
            audioOnly
            rate={2}
          />
        ) : null}
        {/* <LottieView
          source={require('../assets/animations/dancing_flame.json')}
          loop
          autoPlay
          speed={1.5}
          style={{transform: [{scale: 1}], zIndex: 90}}
        /> */}

        {/* //! View that contains button and image hiding underneath */}
        <Animated.View style={styles.centerContentContainer}>
          {!sessState.sessionPlaying ? (
            // Big Button
            <Animated.View
              style={[
                styles.bigButtonContainer,
                {
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
                  // data => {
                  //   data.finished
                  //     ? buttonShrinkAnim.start(buttonData => {
                  //         if (buttonData.finished) {
                  //           periLogoScaleAnim.start(() => {
                  //             sessionPlaying(true);
                  //           });
                  //         }
                  //       })
                  //     : null;
                  // });
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

        {!sessState.sessionPlaying ? (
          <Animated.View
            style={[
              styles.headerContainer,
              {
                opacity: interpolate(headerSlideVal, {
                  inputRange: [0, 0.4, 1],
                  outputRange: [1, 0, 0],
                }),
                transform: [
                  {
                    translateY: interpolate(headerSlideVal, {
                      inputRange: [0, 0.4, 1],
                      outputRange: [0, hp(5), hp(5)],
                    }),
                  },
                ],
              },
            ]}>
            <Animated.Text
              style={[
                styles.header,
                {
                  transform: [
                    {
                      translateY: interpolate(headerPosition, {
                        inputRange: [0, 0.48, 0.49, 0.5, 0.98, 0.99, 1],
                        outputRange: [0, 0, hp(-3), hp(-5), hp(-5), hp(-2), 0],
                      }),
                    },
                  ],
                },
              ]}>
              Tap to start Cheer Session!
            </Animated.Text>
            <Animated.Text
              style={[
                styles.header,
                {
                  transform: [
                    {
                      translateY: interpolate(headerPosition, {
                        inputRange: [0, 0.48, 0.49, 0.5, 0.98, 0.99, 1],
                        outputRange: [0, 0, hp(-3), hp(-5), hp(-5), hp(-2), 0],
                      }),
                    },
                  ],
                },
              ]}>
              3 sessions left
            </Animated.Text>
          </Animated.View>
        ) : null}

        {sessState.sessionPlaying ? (
          <Pressable
            onPress={() => {
              sessionPlaying(false);
              VIForegroundService.stopService();
            }}>
            <Text style={{fontSize: 30}}>Stop music</Text>
          </Pressable>
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
    height: wp(49),
    width: wp(42),
    alignSelf: 'center',
  },
  headerContainer: {
    position: 'absolute',
    bottom: hp(20),
    alignItems: 'center',
    alignSelf: 'center',
    height: hp(5),
    overflow: 'hidden',
  },
  header: {
    fontSize: wp(7),
    fontFamily: 'NunitoSans-Bold',
    color: 'white',
  },
  centerContentContainer: {
    position: 'absolute',
    top: hp(25),
    zIndex: 8.5,
    // borderWidth: 2,
    alignSelf: 'center',
    height: wp(65),
    width: wp(65),
    justifyContent: 'center',
  },
  bigButtonContainer: {
    backgroundColor: '#DE5642',
    position: 'absolute',
    height: wp(65),
    width: wp(65),
    borderRadius: wp(32.5),
    elevation: 9,
    alignSelf: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  bigButton: {
    borderRadius: wp(32.5),
    justifyContent: 'center',
    flex: 1,
  },
  periSessionAnimatedContainer: {
    position: 'absolute',
    zIndex: 3,
    width: wp(100),
  },
  periLogo: {
    // position: 'absolute',
    // top: hp(33),
    // zIndex: 8.4,
    // transform: [{scale: 0.9}],
  },
});

export default SessionScreen;
