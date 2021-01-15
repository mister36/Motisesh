import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Image from 'react-native-scalable-image';

import Spacer from './Spacer';

const MessageText = ({currentMessage}) => {
  //   console.log('props: ', props);
  let textColor;
  let gradientColors;
  let position;
  const {
    text,
    user: {name},
  } = currentMessage;

  // Message looks different according to sender
  if (name === 'Moti') {
    textColor = 'black';
    gradientColors = ['transparent', 'transparent'];
    position = {left: wp(5)};
  } else {
    textColor = 'white';
    gradientColors = ['#F39772', '#E26452'];
    position = {right: wp(5), alignSelf: 'flex-end'};
  }

  return (
    <>
      <View style={[styles.container, position]}>
        {name === 'Moti' ? (
          <Image source={{uri: 'logo'}} height={hp(6.5)} />
        ) : null}
        <LinearGradient
          colors={gradientColors}
          style={styles.gradientContainer}>
          <Text style={[styles.text, {color: textColor}]}>{text}</Text>
        </LinearGradient>
      </View>
      <Spacer margin={hp(2)} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  gradientContainer: {
    // minHeight: hp(5),
    maxWidth: '70%',
    padding: wp(2.5),
    // paddingLeft: wp(4),
    borderTopLeftRadius: wp(6),
    borderBottomLeftRadius: wp(6),
    borderBottomRightRadius: wp(6),
    borderTopRightRadius: wp(1),

    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: wp(4),
  },
});

export default MessageText;
