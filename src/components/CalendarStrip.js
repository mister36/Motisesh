import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {DateTime} from 'luxon';

import DayComponent from '../components/DayComponent';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const now = DateTime.local();
const data = [
  now,
  now.plus({days: 1}),
  now.plus({days: 2}),
  now.plus({days: 3}),
  now.plus({days: 4}),
  now.plus({days: 5}),
];

const radius = wp(3);

const CalendarStrip = ({selectedDate, setSelectedDate}) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={data}
        keyExtractor={item => item.toString()}
        renderItem={({item, index}) => {
          let style = {};

          // Adds border radius and padding to first and last daycomponent
          if (index === 0) {
            style = {
              borderTopLeftRadius: radius,
              borderBottomLeftRadius: radius,
              paddingLeft: wp(3),
            };
          } else if (index === 5) {
            style = {
              borderTopRightRadius: radius,
              borderBottomRightRadius: radius,
              paddingRight: wp(3),
            };
          }
          return (
            <DayComponent
              style={{
                borderRadius: radius,
                paddingLeft: wp(1),
                paddingRight: wp(1),
              }}
              fullDate={item}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    elevation: 3,
    height: hp(10),
    borderRadius: radius,
    backgroundColor: 'white',
  },
});

export default CalendarStrip;
