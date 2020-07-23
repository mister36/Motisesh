import * as React from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';

// Context
import SessionContext from '../context/SessionContext';
// Styling
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// Motion
import Interactable from 'react-native-interactable';
import {PanGestureHandler} from 'react-native-gesture-handler';
// Icon
import Chevron from 'react-native-vector-icons/Entypo';

const SessionPlaying = () => {
  // height of view will be animated
  const viewHeight = React.useRef(new Animated.Value(hp(90))).current;
  const bringViewDown = Animated.timing(viewHeight, {
    toValue: hp(7),
    duration: 250,
    useNativeDriver: false,
  }).start;

  const bringViewUp = Animated.timing(viewHeight, {
    toValue: hp(90),
    duration: 250,
    useNativeDriver: false,
  }).start;

  //!Notes: __getValue() only works when userNativeDriver === false

  return (
    <Animated.View
      style={[styles.container, {height: viewHeight}]}
      onStartShouldSetResponder={() =>
        viewHeight.__getValue() === hp(7) ? bringViewUp() : null
      }>
      <View style={styles.topView}>
        <TouchableOpacity
          activeOpacity={0.2}
          onPress={() => {
            viewHeight.__getValue() === hp(90)
              ? bringViewDown()
              : bringViewUp();
          }}>
          <Animated.View
            style={{
              transform: [
                {
                  rotateY: viewHeight.interpolate({
                    inputRange: [hp(7), hp(90)],
                    outputRange: ['180deg', '0deg'],
                  }),
                },
                {
                  rotateX: viewHeight.interpolate({
                    inputRange: [hp(7), hp(90)],
                    outputRange: ['180deg', '0deg'],
                  }),
                },
              ],
            }}>
            <Chevron name="chevron-down" size={30} />
          </Animated.View>
        </TouchableOpacity>
        <Text>CHEER session</Text>
        <Animated.Text
          style={[
            {
              opacity: viewHeight.interpolate({
                inputRange: [hp(7), hp(90)],
                outputRange: [1, 0],
              }),
            },
          ]}>
          - workout
        </Animated.Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    elevation: 10,
    zIndex: 100,
    width: wp(100),
    bottom: 0,
    backgroundColor: 'white',
  },
  topView: {
    flexDirection: 'row',
  },
});

export default SessionPlaying;
