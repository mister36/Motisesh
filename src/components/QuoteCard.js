import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {CardStyle} from '../styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const QuoteCard = ({quoteText, author, imgSource}) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentHolder}>
        <Text style={styles.quoteText}>{quoteText}</Text>
        <View style={styles.imgAuthor}>
          <Text style={styles.author}>{author}</Text>
          <Image source={imgSource} style={styles.avatar} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CardStyle.mainStyle,
    width: wp(90),
    minHeight: hp(15),
    alignSelf: 'center',
  },
  contentHolder: {
    width: wp(80),
    marginTop: hp(1),
    alignSelf: 'center',
  },
  avatar: {
    height: hp(10),
    width: hp(10),
    borderRadius: 50,
    alignSelf: 'flex-end',
  },
  imgAuthor: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    bottom: 5,
    marginTop: hp(1),
  },
  quoteText: {
    fontFamily: 'NunitoSans-Italic',
    // fontWeight: '700',
    fontSize: wp(4.3),
  },
  author: {
    fontFamily: 'Lato-Regular',
    color: '#7F7F7F',
    textAlignVertical: 'center',
    fontSize: wp(3.5),
    marginRight: wp(2),
  },
});

export default QuoteCard;
