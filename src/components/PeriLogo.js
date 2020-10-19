import React from 'react';
import {View, StyleSheet} from 'react-native';

import Animated, {
  useCode,
  timing,
  set,
  Easing,
  Clock,
  Value,
} from 'react-native-reanimated';
import {loop} from 'react-native-redash';
import {useMemoOne} from 'use-memo-one';

import {AnimatedCircularProgress} from 'react-native-circular-progress';

// Styling
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// store
import {useSessionStore} from '../zustand/store';

const animConstructorFunc = (node, endVal, duration, easing = Easing.linear) =>
  timing(node, {
    duration,
    toValue: endVal,
    easing,
  });

const PeriLogo = ({style}) => {
  const durationOfSession = useSessionStore(state => state.durationOfSession);
  // refs
  const progressRef = React.useRef('progressRef');

  // subscription for session current time values, updates CircularProgress
  React.useEffect(
    () =>
      useSessionStore.subscribe(
        currentSessionTime => {
          console.log(
            `currentSessionTime: ${currentSessionTime}, durationOfSession: ${durationOfSession}`,
          );
          progressRef.current.animate(
            (currentSessionTime / durationOfSession) * 100,
            // 30,
            1000,
            Easing.linear,
          );
        },

        state => state.currentSessionTime,
      ),
    [durationOfSession],
  );

  // anim values
  const {bounceVal, opacityVal} = useMemoOne(
    () => ({
      bounceVal: new Value(0),
      opacityVal: new Value(0),
    }),
    [],
  );

  // Fade in when mounted
  React.useEffect(() => {
    animConstructorFunc(opacityVal, 1, 300).start();
  }, []);

  // Peri logo bounce effect
  useCode(
    () =>
      set(
        bounceVal,
        loop({
          clock: new Clock(),
          duration: 700,
          easing: Easing.linear,
          boomerang: true,
        }),
      ),
    [bounceVal],
  );

  return (
    <Animated.View style={[style, styles.container]}>
      <Animated.Image
        source={require('../assets/images/white-logo.png')}
        style={[
          styles.logo,
          // style,
          {
            opacity: opacityVal,
            transform: [
              {
                translateY: bounceVal.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, hp(3)],
                }),
                scale: 1.2,
              },
            ],
          },
        ]}
      />
      <AnimatedCircularProgress
        ref={progressRef}
        size={wp(80)}
        width={wp(2)}
        fill={0}
        tintColor="#4C8CEA"
        lineCap="round"
        backgroundColor="rgba(255, 255, 255, .1)"
        // backgroundWidth={wp(5)}
        rotation={0}
        style={{position: 'absolute', alignSelf: 'center'}}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderWidth: 2,
    justifyContent: 'center',
    height: wp(80),
    width: wp(100),
  },
  logo: {
    height: wp(44.545), // w:h = 6:7
    width: wp(38.182),
    // transform: [{scale: 1.5}],
    alignSelf: 'center',
    zIndex: 5,
  },
});

export default PeriLogo;
