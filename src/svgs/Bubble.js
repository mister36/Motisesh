import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Animated from 'react-native-reanimated';

import Svg, {G, Path} from 'react-native-svg';

const PathAnim = Animated.createAnimatedComponent(Path);

const GAnim = Animated.createAnimatedComponent(G);

const Bubble = ({animatedFocus, color, size}) => {
  return (
    <View>
      <Svg width={size} height={size} viewBox="0 0 24.176 21.286">
        <GAnim id="Speech_Bubble_48_" transform="translate(0 -30.548)">
          <GAnim
            id="Group_8"
            data-name="Group 8"
            transform="translate(0 30.548)">
            <PathAnim
              id="Path_7"
              data-name="Path 7"
              d="M3.52,51.834H1.807l1.211-1.211A4.1,4.1,0,0,0,4.189,48.2,8.639,8.639,0,0,1,0,40.917c0-5.143,4.727-10.369,12.129-10.369,7.842,0,12.047,4.809,12.047,9.918,0,5.143-4.249,9.949-12.047,9.949A16.34,16.34,0,0,1,8.065,49.9,6.348,6.348,0,0,1,3.52,51.834Z"
              transform="translate(0 -30.548)"
              fill={color}
            />
          </GAnim>
        </GAnim>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Bubble;
