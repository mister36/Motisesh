import * as React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {HeaderStyle, CardStyle, ButtonStyle} from '../styles';
import SessionConfigure from './SessionConfigure';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// Context
import SessionContext from '../context/SessionContext';

const NewSession = ({navigation}) => {
  const {makeConfigVisible} = React.useContext(SessionContext);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>New cheer session waiting!</Text>

      {/* Red/orange box */}
      <LinearGradient
        colors={['#C44040', '#D96432']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={styles.mainBox}>
        <Image
          style={styles.logo}
          source={require('../assets/images/trans-logo.png')}
        />
        <View style={styles.sideContent}>
          <Text style={styles.hypeText}>
            LET'S{'\n'}GET{'\n'}HYPE
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={() => makeConfigVisible(true)}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <SessionConfigure navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: hp(2),
  },
  header: {
    ...HeaderStyle.color,
    fontFamily: 'Lato-Bold',
    fontSize: hp(2.5),
    marginBottom: hp(2),
  },
  mainBox: {
    ...CardStyle.mainStyle,
    width: wp(80),
    flexDirection: 'row',
    padding: wp(3),
  },
  logo: {
    height: hp(17.5),
    width: hp(15),
    alignSelf: 'center',
  },
  sideContent: {
    flex: 1,
    alignItems: 'center',
  },
  hypeText: {
    ...HeaderStyle.text,
    color: '#FFFFFF',
    fontSize: hp(3),
  },
  button: {
    ...ButtonStyle.color,
    ...ButtonStyle.align,
    width: wp(30),
    alignItems: 'center',
    height: hp(6),
    marginTop: hp(1),
  },
  buttonText: {
    fontFamily: 'Lato-Black',
    fontSize: hp(2.5),
  },
});

export default NewSession;
