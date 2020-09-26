import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// Icons
import Foundation from 'react-native-vector-icons/Foundation';

// Notification

// import {useSessionStore} from '../zustand/store';

const SongButton = ({type, title, style}) => {
  // const info = useSessionStore(state => state.sessionPaused);
  // console.log(info);
  let uri;
  let backgroundColor;
  let tintColor;
  switch (type) {
    case 'Hero':
      uri = 'knight';
      backgroundColor = 'purple';
      tintColor = '#E82F2F';
      // imgPath = require('../assets/images/warrior.jpeg');
      break;
    case 'Conquer':
      uri = 'dragon';
      backgroundColor = '#37B946';
      tintColor = '#3752D0';
      break;
    case 'I Can':
      uri = 'flexing';
      backgroundColor = '#E86A2F';
      tintColor = '#E8DA2F';
      break;
    default:
      console.log('inputted invalid type');
  }

  return (
    <View style={[styles.container, {backgroundColor}, style]}>
      <Image
        tintColor={tintColor}
        source={{uri}} // android asset folder
        style={styles.backgroundImg}
      />
      <Foundation name="play" style={styles.playIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: wp(24),
    width: wp(24),
    borderRadius: wp(12),
    backgroundColor: 'purple',
    justifyContent: 'center',
    position: 'relative',
    // TODO: remove this
    // marginLeft: wp(20),
  },
  playIcon: {
    color: '#ffffff',
    fontSize: wp(13),
    alignSelf: 'center',
  },
  backgroundImg: {
    height: wp(24),
    width: wp(24),
    borderRadius: wp(12),
    position: 'absolute',
  },
});

export default SongButton;
