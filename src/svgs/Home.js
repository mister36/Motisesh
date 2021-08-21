import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import Animated from 'react-native-reanimated';

import Svg, {G, Path} from 'react-native-svg';

const PathAnim = Animated.createAnimatedComponent(Path);
const GAnim = Animated.createAnimatedComponent(G);

const Home = ({animatedFocus, color, size}) => {
  return (
    <View>
      <Svg id="home" width={size} height={size} viewBox="0 0 17.093 16.247">
        <GAnim id="Group_4" data-name="Group 4" transform="translate(0 0)">
          <GAnim id="Group_3" data-name="Group 3" transform="translate(0 0)">
            <PathAnim
              id="Path_3"
              data-name="Path 3"
              d="M16.806,19.894,9.137,12.906a.873.873,0,0,0-1.181,0L.287,19.894a.877.877,0,0,0,.59,1.524H2.1v7a.5.5,0,0,0,.5.5h4.2a.5.5,0,0,0,.5-.5V24.168H9.782v4.251a.5.5,0,0,0,.5.5h4.2a.5.5,0,0,0,.5-.5v-7h1.225a.876.876,0,0,0,.59-1.524Z"
              transform="translate(0 -12.675)"
              fill={color}
            />
          </GAnim>
        </GAnim>
        <GAnim
          id="Group_6"
          data-name="Group 6"
          transform="translate(11.483 1.003)">
          <GAnim id="Group_5" data-name="Group 5" transform="translate(0 0)">
            <PathAnim
              id="Path_4"
              data-name="Path 4"
              d="M347.349,42.73h-3.376l3.878,3.527V43.233A.5.5,0,0,0,347.349,42.73Z"
              transform="translate(-343.973 -42.73)"
              fill={color}
            />
          </GAnim>
        </GAnim>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
