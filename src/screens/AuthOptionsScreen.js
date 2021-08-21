import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Image from 'react-native-scalable-image';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {thinFont} from '../styles/uiStyles';
import ActionButton from '../components/ActionButton';

const AuthOptionsScreen = ({navigation}) => {
  const {colors} = useTheme();
  return (
    <LinearGradient
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      colors={['#E26452', '#F39772']}
      style={styles.container}>
      <StatusBar backgroundColor="#E26452" animated />

      <View style={[styles.imgContainer, {width: styles.logo.width}]}>
        <Image source={{uri: 'logo'}} width={styles.logo.width} />
      </View>

      <Text style={styles.text}>World's first AI motivational assistant</Text>

      <View style={styles.buttonContainer}>
        <ActionButton
          text="Login"
          color1="transparent"
          color2="transparent"
          style={[styles.button]}
          textStyle={[styles.buttonText, {color: 'white'}]}
          onPress={() => navigation.navigate('Login')}
        />
        <ActionButton
          text="Sign Up"
          color1="white"
          color2="white"
          style={styles.button}
          textStyle={[styles.buttonText, {color: colors.text}]}
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
  },
  imgContainer: {
    borderRadius: 8,
    top: hp(30),
    alignSelf: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: wp(30),
  },
  text: {
    ...thinFont,
    color: 'white',
    fontSize: wp(5),
    top: hp(35),
    textAlign: 'center',
  },
  button: {
    width: wp(80),

    height: hp(9),
    alignSelf: 'center',
  },
  buttonContainer: {
    top: hp(45),
  },
  buttonText: {
    fontSize: wp(5),
    color: '#E26452',
  },
});

export default AuthOptionsScreen;
