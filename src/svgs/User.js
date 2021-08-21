import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Animated from 'react-native-reanimated';

import Svg, {G, Path} from 'react-native-svg';

const PathAnim = Animated.createAnimatedComponent(Path);
const GAnim = Animated.createAnimatedComponent(G);

const User = ({animatedFocus, color, size}) => {
  return (
    <View>
      <Svg width={size} height={size} viewBox="0 0 19.424 23.282">
        <GAnim id="user_2_" data-name="user (2)" transform="translate(0 0)">
          <PathAnim
            id="Path_8"
            data-name="Path 8"
            d="M92.639,11.215A5.426,5.426,0,0,0,96.6,9.572a5.426,5.426,0,0,0,1.643-3.965A5.427,5.427,0,0,0,96.6,1.643a5.606,5.606,0,0,0-7.93,0,5.426,5.426,0,0,0-1.643,3.965,5.426,5.426,0,0,0,1.643,3.965A5.427,5.427,0,0,0,92.639,11.215Zm0,0"
            transform="translate(-83.074)"
            fill={color}
          />
          <PathAnim
            id="Path_9"
            data-name="Path 9"
            d="M19.377,253.973a13.85,13.85,0,0,0-.189-1.471,11.592,11.592,0,0,0-.362-1.479,7.305,7.305,0,0,0-.608-1.379,5.206,5.206,0,0,0-.917-1.195,4.043,4.043,0,0,0-1.317-.828,4.552,4.552,0,0,0-1.681-.3,1.707,1.707,0,0,0-.911.387c-.273.178-.593.384-.949.612a5.439,5.439,0,0,1-1.228.541,4.77,4.77,0,0,1-3.005,0,5.428,5.428,0,0,1-1.228-.541c-.353-.226-.673-.432-.95-.612a1.7,1.7,0,0,0-.911-.387,4.546,4.546,0,0,0-1.681.3,4.04,4.04,0,0,0-1.317.828,5.207,5.207,0,0,0-.917,1.195,7.319,7.319,0,0,0-.608,1.38A11.618,11.618,0,0,0,.235,252.5a13.8,13.8,0,0,0-.189,1.472c-.031.445-.047.908-.047,1.375a3.866,3.866,0,0,0,1.148,2.925,4.133,4.133,0,0,0,2.959,1.079h11.21a4.132,4.132,0,0,0,2.959-1.079,3.864,3.864,0,0,0,1.148-2.925c0-.469-.016-.932-.047-1.375Zm0,0"
            transform="translate(0 -236.07)"
            fill={color}
          />
        </GAnim>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({});

export default User;
