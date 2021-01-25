import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {DateTime} from 'luxon';

const GoalBox = ({title, date, type}) => {
  let colors;

  if (type === 'task') {
    colors = ['#F39772', '#E26452'];
  } else {
    colors = ['#9DE5FF', '#1DB8EF'];
  }

  return (
    <LinearGradient style={styles.container} colors={colors}>
      <View style={styles.content}>
        <Text
          style={[
            styles.goalText,
            {marginBottom: hp(4), fontFamily: 'Poppins-Bold'},
          ]}>
          {title}
        </Text>
        <Text style={[styles.goalText]}>
          {date.toLocaleString(DateTime.DATE_SHORT)}
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(30),
    width: wp(50),
    borderRadius: 10,
    justifyContent: 'center',
  },
  content: {
    paddingLeft: wp(4),
  },
  goalText: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: wp(5),
  },
});

export default GoalBox;
