import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const Header = () => {
  const date = new Date().getHours();
  let timeOfDay;

  if (date >= 3 && date < 12) {
    timeOfDay = 'morning';
  } else if (date >= 12 && date < 17) {
    timeOfDay = 'afternoon';
  } else {
    timeOfDay = 'evening';
  }

  return (
    <View>
      <Text style={styles.text}>Moti</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'SF-Pro-Text-Semibold',
    textAlign: 'center',
    fontSize: wp(6),
  },
});

export default Header;
