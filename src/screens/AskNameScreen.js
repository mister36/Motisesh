import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

// storage
import AsyncStorage from '@react-native-community/async-storage';

// Store
import {useAuthStore} from '../zustand/store';

import BackgroundImg from '../components/BackgroundImg';
import {HeaderStyle, TextInputStyle, ButtonStyle} from '../styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const AskNameScreen = ({navigation}) => {
  const setSetUpComplete = useAuthStore(state => state.setSetUpComplete);
  // Sets name, rerenders app
  const setName = async name => {
    try {
      await AsyncStorage.setItem('name', name);
      setSetUpComplete();
    } catch (error) {
      console.error(error);
    }
  };

  // State
  const [nameGiven, setNameGiven] = React.useState('');
  const [isAnimating, setIsAnimating] = React.useState(false);
  return (
    <View>
      <BackgroundImg />
      <Text numberOfLines={2} style={styles.header}>
        What is your first name?
      </Text>
      <TextInput
        style={styles.input}
        value={nameGiven}
        onChangeText={setNameGiven}
        autoCorrect={false}
        maxLength={13}
        textAlign="center"
      />
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.button}
        onPress={() => {
          setIsAnimating(true);
          nameGiven.length > 0 && nameGiven.length < 13
            ? setName(nameGiven)
            : setIsAnimating(false);
        }}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <ActivityIndicator size="large" color="#27C2C6" animating={isAnimating} />
    </View>
  );
};

// TODO allow text input to scroll up when keyboard pops up

const styles = StyleSheet.create({
  header: {
    // ...HeaderStyle.text,
    ...HeaderStyle.color,
    fontFamily: 'Lato-Black',
    fontSize: hp(4.5),
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: hp(30),
  },
  input: {
    ...TextInputStyle.textInput,
  },
  button: {
    ...ButtonStyle.color,
    width: wp(40),
    alignSelf: 'center',
    marginTop: hp(10),
    height: hp(8),
    ...ButtonStyle.align,
  },
  buttonText: {
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
    fontSize: hp(3),
  },
});

export default AskNameScreen;
