import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import AnimatedProgressWheel from 'react-native-progress-wheel';

const SessionsLeftCircle = ({svgSide, radius, completed}) => {
  const remaining = 5 - completed;

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <AnimatedProgressWheel
          size={wp(30)}
          width={wp(2.5)}
          color={remaining > 2 ? '#0A3641' : '#851B1B'}
          progress={(remaining / 5) * 100}
          backgroundColor="#F4C0A9"
          animateFromValue={0}
          duration={1000}
        />
        <Text
          style={[
            styles.number,
            {color: remaining > 2 ? '#0A3641' : '#851B1B'},
          ]}>
          {remaining}
        </Text>
      </View>
      <Text
        style={[
          styles.remainingText,
          {color: remaining > 2 ? '#0A3641' : '#851B1B'},
        ]}>
        Sessions{'\n'}remaining
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    marginRight: wp(2),
  },
  progressContainer: {
    transform: [{rotate: '270deg'}],
    width: wp(30),
    alignSelf: 'center',
  },
  number: {
    transform: [{rotate: '90deg'}],
    fontSize: wp(11),
    position: 'absolute',
    top: wp(8),
    left: wp(12),
    fontFamily: 'NunitoSans-Bold',
    color: '#0A3641',
  },
  remainingText: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: wp(5.5),
    color: '#0A3641',
    textAlign: 'center',
    lineHeight: hp(3.8),
    alignSelf: 'center',
  },
});

export default SessionsLeftCircle;
