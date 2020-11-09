import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// Icons
import Foundation from 'react-native-vector-icons/Foundation';

import Samurai from '../assets/images/samurai.svg';

// Notification

// import {useSessionStore} from '../zustand/store';

const SongTypeButton = ({type, title, style}) => {
  // const info = useSessionStore(state => state.sessionPaused);
  // console.log(info);
  let uri;
  let imgPath;
  let backgroundColor = 'rgb(255, 255, 255)';
  let tintColor;
  let renderImg = () => {};
  //ninja.png
  //dragon.png
  switch (type) {
    case 'hero':
      // renderImg = () => <Samurai width={wp(20)} />;
      // uri = 'knight';
      // backgroundColor = 'purple';
      // tintColor = '#E82F2F';
      uri = 'ninja';
      break;
    case 'rise':
      // uri = 'dragon';
      // backgroundColor = '#37B946';
      // tintColor = '#3752D0';
      uri = 'dragon';
      break;
    // case 'I Can':
    //   uri = 'flexing';
    //   backgroundColor = '#E86A2F';
    //   tintColor = '#E8DA2F';
    //   break;
    default:
      console.log('inputted invalid type');
  }

  return (
    <View style={[styles.container, style]}>
      <Image
        // tintColor="#E82F2F"
        source={{uri}} // android asset folder
        // tintColor={'white'}
        style={styles.backgroundImg}
      />
      {/* {renderImg()} */}
      {/* <SamuraiSvg length={wp(20)} /> */}
      {/* <Foundation name="play" style={styles.playIcon} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: wp(28),
    width: wp(28),
    borderRadius: wp(14),
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: '#ffffff',
    // TODO: remove this
    // marginLeft: wp(28),
  },
  playIcon: {
    color: '#ffffff',
    fontSize: wp(13),
    alignSelf: 'center',
  },
  backgroundImg: {
    height: wp(28),
    width: wp(28),
    borderRadius: wp(14),
    position: 'absolute',
  },
});

export default SongTypeButton;
