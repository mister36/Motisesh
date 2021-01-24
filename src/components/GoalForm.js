import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import ActionButton from './ActionButton';
import Spacer from './Spacer';
import {postMessage} from '../../socket';

const GoalForm = ({style}) => {
  // state
  const [goal, setGoal] = useState('');
  const [date, setDate] = useState('');
  const [goalType, setGoalType] = useState('Task');
  const [loading, setLoading] = useState(false);

  const conditional = () => {
    if (goalType === 'Task') {
      return (
        <>
          <Spacer margin={hp(1)} />
          <Text style={styles.header}>When will you do this?</Text>
          <TextInput
            value={date}
            onChangeText={setDate}
            style={styles.input}
            placeholder="Tomorrow at 5am"
          />
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={[styles.wrapper, style]}>
      <View style={[styles.container]}>
        <View style={styles.row}>
          <Text style={styles.header}>Goal</Text>
          <TextInput
            value={goal}
            onChangeText={setGoal}
            style={styles.input}
            placeholder="Go to the gym"
          />
        </View>

        <View style={styles.row}>
          <View style={styles.pickerWrapper}>
            <Picker
              mode="dropdown"
              style={styles.picker}
              itemStyle={styles.pickerItem}
              selectedValue={goalType}
              onValueChange={itemValue => {
                setGoalType(itemValue);
              }}>
              <Picker.Item label="Task" value="Task" />
              <Picker.Item label="Habit" value="Habit" />
            </Picker>
          </View>
        </View>

        <View style={styles.row}>{conditional()}</View>

        <ActionButton
          style={styles.confirmButton}
          textStyle={styles.confirmButtonText}
          color1="#F39772"
          color2="#E26452"
          text="Confirm"
          loading={loading}
          onPress={() => {
            setLoading(true);
            postMessage(
              '/info' +
                JSON.stringify({
                  goal,
                  goal_type: goalType.toLowerCase(),
                  word_time: goalType === 'Task' ? date : '12:00pm', // allow user to change habit time after alpha
                }),
            );
          }}
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
    paddingTop: hp(1),
  },
  header: {
    color: '#E26452',
    fontFamily: 'Montserrat-Medium',
  },
  row: {
    marginLeft: wp(5),
  },
  pickerWrapper: {
    borderWidth: 1.5,
    borderRadius: 7,
    borderColor: '#E26452',
    width: wp(70),
  },
  picker: {
    width: wp(70),
  },
  pickerItem: {
    fontFamily: 'Montserrat-Medium',
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
    marginTop: hp(2),
    marginBottom: hp(2),
    // bottom: hp(2),
  },
  confirmButtonText: {
    color: 'white',
    fontSize: wp(4),
  },
});

export default GoalForm;
