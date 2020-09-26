import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Animated, {timing, Value, Easing} from 'react-native-reanimated';

import {useMemoOne} from 'use-memo-one';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// Picker
import {WheelPicker} from 'react-native-wheel-picker-android';

const SessionWheelPicker = ({data, style, onItemSelected, fadeOut}) => {
  // animation vals
  const {containerOpacVal} = useMemoOne(
    () => ({containerOpacVal: new Value(0)}),
    [],
  );

  //   fade in when mounted
  React.useEffect(() => {
    timing(containerOpacVal, {
      duration: 100,
      toValue: 1,
      easing: Easing.linear,
    }).start();
  }, []);

  // fade out when fadeOut === false
  React.useEffect(() => {
    if (fadeOut) {
      timing(containerOpacVal, {
        duration: 100,
        toValue: 0,
        easing: Easing.linear,
      }).start();
    }
  }, [fadeOut]);

  return (
    <Animated.View style={[style, {opacity: containerOpacVal}]}>
      <WheelPicker
        data={data}
        itemTextColor="rgba(34, 115, 124, .3)"
        selectedItemTextColor="#15535A"
        itemTextFontFamily="Lato-Black"
        selectedItemTextFontFamily="Lato-Black"
        itemTextSize={wp(6)}
        selectedItemTextSize={wp(6)}
        // hideIndicator={true}
        indicatorWidth={3}
        indicatorColor="white"
        onItemSelected={onItemSelected}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({});

export default SessionWheelPicker;
