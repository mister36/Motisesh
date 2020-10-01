import * as React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Easing} from 'react-native-reanimated';

import {AnimatedCircularProgress} from 'react-native-circular-progress';

// import SessionSlider from '../components/SessionSlider';
// import SongButton from '../components/SongButton';

// import {useSessionStore} from '../zustand/store';

const StatsScreen = () => {
  const circleRef = React.useRef('circleRef');
  return (
    <View>
      <AnimatedCircularProgress
        size={120}
        width={15}
        fill={30}
        tintColor="black"
        ref={circleRef}
      />

      <Pressable
        onPress={() => {
          circleRef.current.animate(
            Math.floor(Math.random() * 100),
            1000,
            Easing.linear,
          );
        }}
        style={{
          backgroundColor: 'orange',
          height: hp(10),
          width: wp(30),
          marginTop: hp(5),
        }}>
        {/* <Text>PRESS ME</Text> */}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  topScreen: {
    marginTop: hp(6),
  },
  buttonContainer: {
    marginTop: hp(4),
  },
});

export default StatsScreen;
