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

// Components
import SessionsLeftCircle from '../components/SessionsLeftCircle';

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

// Utils
import {decToMin} from '../utils/getStats';

const SessionScreen = ({navigation}) => {
  // Context
  const {state: sessState, sessionPlaying} = React.useContext(SessionContext);
  // State
  const [completed, setCompleted] = React.useState(-1);
  const [lightningVisible, setLightningVisible] = React.useState(false);

  // Refs
  const buttonRef = React.useRef('buttonRef');

  // Creating Animatable components
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  // Ask for access to storage
  requestDownloadPermission(requestReadFilePermission);

  // Code needed for button bounce effect
  const {bounce, headerSlideVal} = useMemoOne(
    () => ({
      bounce: new Value(0),
      headerSlideVal: new Value(0),
    }),
    [headerSlideVal],
  );

  useCode(
    () =>
      set(
        bounce,
        loop({
          clock: new Clock(),
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          boomerang: true,
          autoStart: true,
        }),
      ),
    [bounce],
  );

  const flashAnim = () => {
    const clock = new Clock();

    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0),
    };

    const config = {
      duration: new Value(1000),
      toValue: new Value(1),
      easing: Easing.quad,
    };

    return block([
      startClock(clock),
      timing(clock, state, config),

      cond(not(clockRunning(clock)), [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.frameTime, 0),
      ]),

      cond(state.finished, [
        stopClock(clock),
        call([], () => {
          setLightningVisible(false);
        }),
      ]),

      state.position,
    ]);
  };

  // Bottom header animation
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
  const flashOpacity = flashAnim();

  const headerSlideAnim = timing(headerSlideVal, {
    duration: 200,
    toValue: 1,
    easing: Easing.linear,
  });

  // const light is sfs

  return (
    <Animated.View style={[styles.preSessionAnimatedContainer]}>
      {lightningVisible ? (
        <Animated.View
          style={[
            styles.whiteFlash,
            {
              opacity: interpolate(flashOpacity, {
                inputRange: [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1],
                outputRange: [0, 0.8, 0, 0.8, 0, 0.8, 0],
              }),
            },
          ]}
        />
      ) : null}
      <LinearGradient
        colors={['#F59C75', '#E26452']}
        end={{x: 0.5, y: 0.7}}
        style={[styles.preSessionGradientContainer]}>
        {lightningVisible ? (
          <LottieView
            source={require('../assets/animations/lightning.json')}
            loop
            autoPlay
            speed={1.5}
            style={{}}
          />
        ) : null}
        <Animated.View
          style={[
            styles.bigButtonContainer,
            {
              transform: [
                {
                  scale: bounce.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.1],
                  }),
                },
              ],
            },
          ]}>
          <Pressable
            onPress={() => {
              setLightningVisible(lightningVisible ? false : true);
              headerSlideAnim.start();
            }}
            style={[styles.bigButton]}>
            <Image
              source={require('../assets/images/white-logo.png')}
              style={styles.logo}
            />
          </Pressable>
        </Animated.View>

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
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  preSessionAnimatedContainer: {
    position: 'absolute',
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
    // borderWidth: 2,
    height: hp(5),
    // paddingBottom: hp(10),
    overflow: 'hidden',
  },
  header: {
    fontSize: wp(7),
    fontFamily: 'NunitoSans-Bold',
    color: 'white',
  },
  bigButtonContainer: {
    backgroundColor: '#DE5642',
    height: wp(65),
    width: wp(65),
    borderRadius: wp(32.5),
    elevation: 9,
    position: 'absolute',
    top: hp(25),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  bigButton: {
    borderRadius: wp(32.5),
    justifyContent: 'center',
    flex: 1,
  },
  whiteFlash: {
    backgroundColor: 'white',
    height: 1000,
    width: wp(100),
    position: 'absolute',
    zIndex: 1000,
    elevation: 10,
  },
  periSessionAnimatedContainer: {
    position: 'absolute',
    zIndex: 3,
    width: wp(100),
  },
});

export default SessionScreen;
