import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// Permission
import {
  requestDownloadPermission,
  requestReadFilePermission,
} from '../utils/permissions';

// Components

// Context
import SessionContext from '../context/SessionContext';

// Styling
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Svg, {Circle} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import DropShadow from 'react-native-drop-shadow';

const SessionScreen = () => {
  requestDownloadPermission(requestReadFilePermission);

  const svgSide = wp(40);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {/* Background Circle */}
        <Svg width={svgSide} height={svgSide} style={[styles.mainSvgCircle]}>
          <Circle
            stroke="#FFFFFF3A"
            strokeWidth={wp(3)}
            fill="none"
            cx={svgSide / 2}
            cy={svgSide / 2}
            r={wp(18)}
          />
          {/* Progress Circle */}
          <Circle
            stroke="#FFFFFF"
            strokeWidth={wp(3)}
            fill="none"
            cx={svgSide / 2}
            cy={svgSide / 2}
            r={wp(18)}
            strokeDasharray={`${2 * wp(18) * Math.PI} ${2 * wp(18) * Math.PI}`}
            strokeDashoffset={wp(18) * Math.PI * 2 * 0.15}
            strokeLinecap="round"
            transform={`rotate(-90, ${svgSide / 2}, ${svgSide / 2})`}
          />
        </Svg>
      </View>
      <View style={styles.bottomView}>{/* <Text>hey</Text> */}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    backgroundColor: '#F47F4D',
    // backgroundColor: '#E7803D',
  },
  bottomView: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: hp(8),
    borderTopRightRadius: hp(8),
    height: hp(50),
    width: wp(100),
    marginTop: 'auto',
  },
  mainSvgCircle: {
    alignSelf: 'flex-end',
  },
  topRow: {
    marginTop: hp(1),
  },
});

export default SessionScreen;
