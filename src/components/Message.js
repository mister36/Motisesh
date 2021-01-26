import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Image from 'react-native-scalable-image';

const Message = ({text, name}) => {
  let textColor;
  let gradientColors;
  let position;

  // Text message looks different according to sender
  if (name === 'Moti') {
    textColor = 'black';
    gradientColors = ['white', 'white'];
    position = {left: wp(5)};
  } else {
    textColor = 'white';
    gradientColors = ['#F39772', '#E26452'];
    position = {right: wp(5), alignSelf: 'flex-end'};
  }
  return (
    <View style={[styles.container, position]}>
      {name === 'Moti' ? (
        <Image source={{uri: 'logo'}} height={hp(6.5)} />
      ) : null}
      <LinearGradient colors={gradientColors} style={styles.gradientContainer}>
        <Text style={[styles.text, {color: textColor}]}>{text}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopLeftRadius: wp(6),
    borderBottomLeftRadius: wp(6),
    borderBottomRightRadius: wp(6),
    borderTopRightRadius: wp(1),
    marginBottom: hp(1.5),
  },
  gradientContainer: {
    maxWidth: '70%',
    padding: wp(2.5),
    elevation: 5,
    paddingLeft: wp(4),
    borderTopLeftRadius: wp(6),
    borderBottomLeftRadius: wp(6),
    borderBottomRightRadius: wp(6),
    borderTopRightRadius: wp(1),
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: 'SF-Pro-Text-Medium',
    fontSize: wp(4.2),
  },
});

export default Message;
