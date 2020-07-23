import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// Component for each dot and text in legend
const LegendPiece = ({text, percentage, color}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.dot, {backgroundColor: color}]} />
      <Text style={[styles.text, {color}]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.5),
  },
  dot: {
    height: hp(1.8),
    width: hp(1.8),
    borderRadius: hp(1.5),
    marginRight: wp(2),
  },
  text: {
    fontFamily: 'Lato-Bold',
  },
});

export default LegendPiece;
