import React from 'react';
import {View} from 'react-native';
import {InputToolbar} from 'react-native-gifted-chat';

const Input = props => {
  return <InputToolbar {...props} containerStyle={{borderTopWidth: 0}} />;
};

export default Input;
