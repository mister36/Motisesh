import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Animated, {
  exp,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ActionButton from './ActionButton';
import {postMessage} from '../../socket';

const MissionForm = ({style}) => {
  const [mission, setMission] = useState('');
  const [date, setDate] = useState('');
  const [expanded, setExpanded] = useState(true);

  const heightVal = useSharedValue(hp(35));
  // anim
  const heightAnim = useAnimatedStyle(() => {
    // const height = withTiming(heightVal.value, {duration: 150});
    return {
      height: withTiming(heightVal.value, {duration: 150}),
      justifyContent: 'center',
    };
  });

  return (
    <Animated.View style={[styles.wrapper, style, heightAnim]}>
      <View style={[styles.container]}>
        {expanded ? (
          <>
            <View style={styles.row}>
              <Text style={styles.header}>Mission</Text>
              <TextInput
                value={mission}
                onChangeText={setMission}
                style={styles.input}
                placeholder="Lose 25 pounds"
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.header}>When should it end?</Text>
              <TextInput
                value={date}
                onChangeText={setDate}
                style={styles.input}
                placeholder="January 25"
              />
            </View>
            <ActionButton
              style={styles.confirmButton}
              textStyle={styles.confirmButtonText}
              color1="#F39772"
              color2="#E26452"
              text="Confirm"
              loading={false}
              onPress={() => {
                heightVal.value = hp(10);
                setExpanded(false);
                postMessage(
                  '/info' +
                    JSON.stringify({
                      mission,
                      word_time: date,
                    }),
                );
              }}
            />
          </>
        ) : (
          <Text
            style={{
              fontSize: wp(6),
              color: '#E26452',
              fontFamily: 'Montserrat-Medium',
              textAlign: 'center',
            }}>
            Sent
          </Text>
        )}
      </View>
    </Animated.View>
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

    // marginTop: hp(1),
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
