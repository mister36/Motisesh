import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {sameDate} from '../utils/helpers';

const DayComponent = ({style, fullDate, selectedDate, setSelectedDate}) => {
  const dayArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const isSelected = sameDate(selectedDate, fullDate);

  return (
    <Pressable
      onPress={() => {
        setSelectedDate(fullDate);
      }}>
      <LinearGradient
        colors={isSelected ? ['#F39772', '#E26452'] : ['white', 'white']}
        style={[styles.container, style]}>
        <Text
          style={[
            styles.text,
            styles.dayOfMonth,
            {color: isSelected ? 'white' : 'black'},
          ]}>
          {fullDate.day}
        </Text>
        <Text
          style={[
            styles.text,
            styles.dayOfWeek,
            {color: isSelected ? 'white' : 'black'},
          ]}>
          {dayArr[fullDate.weekday]}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};
//['#F39772', '#E26452']

const styles = StyleSheet.create({
  container: {
    height: hp(10),
    width: wp(15),
    // borderRadius: wp(6),
  },
  text: {
    fontFamily: 'ProximaNova-Regular',
    alignSelf: 'center',
    marginTop: hp(1),
  },
  dayOfMonth: {
    fontSize: wp(5.5),
  },
  dayOfWeek: {
    fontSize: wp(3.5),
    color: '#8C919C',
  },
});

export default DayComponent;
