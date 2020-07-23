import * as React from 'react';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';

// Responsiveness
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// Icons

// Styling
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

const SessionPlayingScreen = ({navigation}) => {
  const progress = React.useRef(new Animated.Value(0)).current;
  return (
    <LinearGradient
      // colors={['#7E2323', '#D3503B']}
      colors={['#7E2323', '#7E2323']}
      style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.title}>Cheer Session - Workout</Text>
      </View>
      <View style={styles.mainPlayer}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
        <LottieView
          source={require('../assets/animations/pulse.json')}
          autoPlay={true}
          loop
          style={{height: 200, width: 200}}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    alignItems: 'center',
    marginTop: hp(1.5),
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: wp(5),
    textAlign: 'center',
    color: 'white',
  },
  mainPlayer: {
    alignItems: 'center',
    marginTop: hp(25),
  },
  logo: {
    height: wp(48),
    width: wp(40.8),
  },
});

export default SessionPlayingScreen;
