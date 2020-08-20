import * as React from 'react';
import {View, StyleSheet, Animated as RAnimated} from 'react-native';

// Animated
import Animated, {
  useCode,
  Value,
  Clock,
  Easing,
  set,
} from 'react-native-reanimated';

// Caching animations
import {useMemoOne} from 'use-memo-one';

// Redash
import {loop} from 'react-native-redash';

// Styling
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import LottieView from 'lottie-react-native';

const SessionAnimation = () => {
  // Saves animation value
  const {lightningVal} = useMemoOne(() => ({
    lightningVal: new Value(0),
  }));

  // Loops lightning
  useCode(() =>
    set(
      lightningVal,
      loop({
        clock: new Clock(),
        duration: 7000,
        easing: Easing.linear,
        boomerang: true,
        autoStart: true,
      }),
    ),
  );

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: lightningVal.interpolate({
            inputRange: [0, 0.8, 1],
            outputRange: [0, 0, 1],
          }),
        }}>
        <LottieView
          source={require('../assets/animations/lightning.json')}
          // loop={false}
          autoPlay
          // progress={lightningVal}
          // speed={1.5}
          style={styles.lightning}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 11,
    borderWidth: 2,
    height: hp(70),
  },
  lightning: {
    height: hp(70),
    alignSelf: 'center',
  },
});

export default SessionAnimation;
