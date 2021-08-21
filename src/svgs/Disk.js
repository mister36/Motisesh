import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Animated from 'react-native-reanimated';

import Svg, {G, Path} from 'react-native-svg';

const PathAnim = Animated.createAnimatedComponent(Path);
const GAnim = Animated.createAnimatedComponent(G);

const Disk = ({animatedFocus, color, size}) => {
  return (
    <View>
      <Svg id="disk" width={size} height={size} viewBox="0 0 22.786 22.786">
        <GAnim id="Group_7" data-name="Group 7">
          <PathAnim
            id="Path_5"
            data-name="Path 5"
            d="M185.879,188.844a2.965,2.965,0,1,0-2.964-2.965A2.968,2.968,0,0,0,185.879,188.844Zm0-4.842A1.878,1.878,0,1,1,184,185.879,1.878,1.878,0,0,1,185.879,184Z"
            transform="translate(-174.486 -174.487)"
            fill={color}
          />
          <PathAnim
            id="Path_6"
            data-name="Path 6"
            d="M11.393,22.786A11.393,11.393,0,1,0,0,11.393,11.393,11.393,0,0,0,11.393,22.786Zm0-20.813a9.431,9.431,0,0,1,9.42,9.42h-.636A8.793,8.793,0,0,0,11.393,2.61V1.973Zm0,2.855a6.573,6.573,0,0,1,6.565,6.565h-.636a5.936,5.936,0,0,0-5.929-5.929V4.828Zm0,2.964a3.6,3.6,0,1,1-3.6,3.6A3.6,3.6,0,0,1,11.393,7.792Z"
            fill={color}
          />
        </GAnim>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Disk;
