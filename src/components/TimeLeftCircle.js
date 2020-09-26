import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {AnimatedCircularProgress} from 'react-native-circular-progress';
import LottieView from 'lottie-react-native';

import Animated, {timing, Value, Easing} from 'react-native-reanimated';
import {useMemoOne} from 'use-memo-one';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const sideLength = wp(77);
const borderRadius = sideLength / 2;

const TimeLeftCircle = ({style}) => {
  // animation values
  const {containerOpacityVal} = useMemoOne(() => ({
    containerOpacityVal: new Value(0),
  }));

  React.useEffect(() => {
    timing(containerOpacityVal, {
      duration: 300,
      toValue: 1,
      easing: Easing.linear,
    }).start();
  }, []);
  return (
    <Animated.View style={[style, {opacity: containerOpacityVal}]}>
      <AnimatedCircularProgress
        size={wp(80)}
        width={wp(2)}
        fill={60}
        tintColor="#4C8CEA"
        lineCap="round"
        backgroundColor="rgba(255, 255, 255, .1)"
        // backgroundWidth={wp(5)}
        rotation={0}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: sideLength,
    width: sideLength,
    borderRadius,
    borderWidth: wp(3),
  },
});

export default TimeLeftCircle;
