import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import SwitchSelector from 'react-native-switch-selector';
import {Picker} from '@react-native-community/picker';
import Slider from '@react-native-community/slider';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {CardStyle, ButtonStyle} from '../styles';

// Context
import SessionContext from '../context/SessionContext';

const SessionConfigure = ({navigation}) => {
  const {state, makeConfigVisible, sessionPlaying} = React.useContext(
    SessionContext,
  );
  const [categoryState, setCategoryState] = React.useState('general');
  const [duration, setDuration] = React.useState(1);
  const [intensity, setIntensity] = React.useState(1);

  const options = [
    {label: 'REGULAR', value: 'regular'},
    {label: 'MEDIUM', value: 'medium'},
    {label: 'INTENSE', value: 'intense'},
  ];

  return (
    <Modal
      isVisible={state.configVisible}
      onBackButtonPress={() => makeConfigVisible(false)}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      style={styles.container}>
      <View style={styles.topView}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => makeConfigVisible(false)}>
          <Text style={styles.cancelText}>cancel</Text>
        </TouchableOpacity>
      </View>

      <SwitchSelector
        options={options}
        initial={0}
        onPress={value => setIntensity(value)}
        buttonColor="#D15621"
        style={styles.selector}
        textStyle={styles.selectorText}
        selectedTextStyle={styles.selectorText}
        height={hp(6)}
      />
      <View style={styles.descriptionBox}>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor.
        </Text>
        <View style={styles.horizontalRule} />
      </View>

      <View style={styles.category}>
        <Text style={styles.categoryText}>Pick a category</Text>
        <Picker
          selectedValue={categoryState}
          onValueChange={item => setCategoryState(item)}
          style={styles.picker}>
          <Picker.Item label="Workout" value="workout" />
          <Picker.Item label="Chores" value="chores" />
          <Picker.Item label="General" value="general" />
          <Picker.Item label="Study" value="study" />
          <Picker.Item label="Work" value="work" />
        </Picker>
      </View>

      <View style={styles.category}>
        <Text style={styles.categoryText}>Duration</Text>
        <Text style={styles.durationText}>{duration} min</Text>
        <Slider
          minimumValue={1}
          maximumValue={5}
          value={duration}
          step={0.5}
          onSlidingComplete={val => setDuration(val)}
          style={styles.slider}
          minimumTrackTintColor="#0A3641"
          thumbTintColor="#0A3641"
        />
      </View>

      <TouchableOpacity
        style={styles.beginButton}
        activeOpacity={0.7}
        onPress={() => {
          makeConfigVisible(false);
        }}>
        <Text style={styles.beginButtonText}>Begin</Text>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    height: hp(100),
    width: wp(100),
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
  topView: {
    backgroundColor: '#0A3641',
    height: hp(6),
    justifyContent: 'center',
    marginBottom: hp(3),
  },
  cancelButton: {
    alignSelf: 'flex-start',
    marginLeft: wp(7),
    padding: wp(1),
  },
  cancelText: {
    color: 'white',
    fontFamily: 'Lato-Regular',
    fontSize: hp(2.5),
  },
  selectorText: {
    fontFamily: 'Lato-Bold',
    fontSize: hp(2.2),
  },
  descriptionBox: {
    marginTop: hp(3),
  },
  description: {
    fontFamily: 'Merriweather-Regular',
    width: wp(85),
    fontSize: hp(2),
    alignSelf: 'center',
  },
  horizontalRule: {
    width: wp(20),
    borderBottomWidth: 1,
    borderBottomColor: '#CA2121',
    marginLeft: wp(7.5),
    marginTop: hp(2),
  },
  category: {
    ...CardStyle.mainStyle,
    height: hp(17),
    width: wp(90),
    alignSelf: 'center',
    marginTop: hp(4),
  },
  categoryText: {
    fontFamily: 'Lato-Bold',
    color: '#D15621',
    fontSize: hp(2.8),
    alignSelf: 'flex-start',
    marginLeft: wp(5),
    marginTop: hp(2),
  },
  picker: {
    width: wp(80),
    marginLeft: wp(5),
  },
  beginButton: {
    ...ButtonStyle.color,
    ...ButtonStyle.align,
    width: wp(40),
    height: hp(8),
    alignSelf: 'center',
    marginTop: hp(3),
  },
  beginButtonText: {
    fontFamily: 'Lato-Bold',
    fontSize: hp(3),
    alignSelf: 'center',
  },
  slider: {
    width: wp(80),
    marginTop: hp(1.5),
    marginLeft: wp(5),
  },
  durationText: {
    alignSelf: 'flex-end',
    marginRight: wp(10),
    fontFamily: 'Lato-Regular',
    fontSize: hp(2.5),
  },
});

export default SessionConfigure;
