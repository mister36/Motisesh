import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import GoalForm from './GoalForm';
import Message from './Message';

let render;

const ChatMessage = ({currentMessage}) => {
  const {
    text,
    user: {name},
    component,
  } = currentMessage;

  if (component === 'goal_form') {
    render = <GoalForm style={styles.missionForm} />;
  } else {
    render = <Message text={text} name={name} />;
  }

  return render;
};

const styles = StyleSheet.create({
  missionForm: {
    alignSelf: 'center',
  },
});

export default ChatMessage;
