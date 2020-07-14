import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  requestDownloadPermission,
  requestReadFilePermission,
} from '../utils/permissions';
import LinearGradient from 'react-native-linear-gradient';

// Context
import SessionContext from '../context/SessionContext';
// Components
// Styles
import {ButtonStyle, CardStyle, HeaderStyle} from '../styles';

const SessionScreen = () => {
  requestDownloadPermission(requestReadFilePermission);

  const {state, makeConfigVisible} = React.useContext(SessionContext);
  const [cheerLeft, setCheerLeft] = React.useState(0);

  React.useEffect(() => {
    const sessionsLeft = async () => {
      try {
        setCheerLeft(await AsyncStorage.getItem('daily_sessions_remaining'));
      } catch (error) {
        setCheerLeft(0);
      }
    };
    sessionsLeft();
  }, []);

  return (
    <LinearGradient
      colors={['#5D1A1A', '#D3503B']}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.header}>Cheer Session</Text>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.randomText}>Ready to get excited? I am</Text>

      {/* <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardText}>{cheerLeft} sessions remaining</Text>
        </View>
      </View> */}

      <TouchableOpacity
        style={styles.continueButtonStyle}
        onPress={() => makeConfigVisible(true)}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    ...HeaderStyle.text,
    alignSelf: 'center',
    color: 'white',
    marginTop: hp(1),
  },
  logo: {
    height: wp(55.8),
    width: wp(47.5),
    alignSelf: 'center',
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  continueButtonStyle: {
    ...ButtonStyle.color,
    ...ButtonStyle.align,
    width: wp(40),
    height: hp(7),
    alignItems: 'center',
    alignSelf: 'center',
    top: hp(5),
  },
  continueText: {
    fontFamily: 'Lato-Black',
    fontSize: hp(2.8),
  },
  cardContainer: {
    marginTop: hp(5),
  },
  card: {
    ...CardStyle.mainStyle,
    marginTop: hp(2),
    borderRadius: 4,
    height: hp(9),
    justifyContent: 'center',
    width: wp(50),
    marginLeft: wp(2),
  },
  cardText: {
    fontFamily: 'Lato-Regular',
    fontSize: hp(2.5),
    color: 'black',
    marginLeft: wp(1),
  },
  randomText: {
    fontFamily: 'Merriweather-Regular',
    color: 'white',
    fontSize: hp(2.5),
  },
});

export default SessionScreen;
