import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ActionButton from './ActionButton';

const MissionForm = ({style}) => {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, style]}>
        <View style={styles.row}>
          <Text style={styles.header}>Mission</Text>
          <TextInput style={styles.input} placeholder="Lose 25 pounds" />
        </View>

        <View style={styles.row}>
          <Text style={styles.header}>When should it end?</Text>
          <TextInput style={styles.input} placeholder="January 25" />
        </View>

        <ActionButton
          style={styles.confirmButton}
          textStyle={styles.confirmButtonText}
          color1="#F39772"
          color2="#E26452"
          text="Confirm"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    borderRadius: wp(2),
    elevation: 8,
    width: wp(87),
  },
  container: {
    // height: hp(55),
    borderRadius: wp(5),
    backgroundColor: 'transparent',
  },
  header: {
    color: '#E26452',
    fontFamily: 'Montserrat-Medium',
  },
  row: {
    marginLeft: wp(5),
  },
  input: {
    fontSize: wp(4.5),
    marginBottom: hp(2),
    fontFamily: 'Montserrat-Medium',
  },
  confirmButton: {
    width: wp(30),
    height: hp(5.5),
    alignSelf: 'flex-end',
    marginRight: wp(3),
    bottom: hp(2),
  },
  confirmButtonText: {
    color: 'white',
    fontSize: wp(4),
  },
});

export default MissionForm;
