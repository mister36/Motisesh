import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {sizeFont} from '../styles/uiStyles';

const AuthTextInput = ({
  placeholder,
  style,
  value,
  onChangeText,
  autoCompleteType,
  autoCapitalize,
  secureTextEntry,
}) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={[style, styles.container]}
      placeholderTextColor="black"
      autoCompleteType={autoCompleteType ? autoCompleteType : undefined}
      autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
      secureTextEntry={secureTextEntry ? secureTextEntry : false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 4,
    backgroundColor: 'white',
    borderRadius: 10,
    fontFamily: 'Montserrat-Regular',
    color: '#444444',
    paddingLeft: wp(5),
    ...sizeFont,
  },
});

export default AuthTextInput;
