import * as React from 'react';
import {Image, StyleSheet} from 'react-native';
import {BackgroundImgStyle} from '../styles';
// import FlyingBirds from './FlyingBirds';

const BackGroundImg = () => {
  return (
    <Image
      source={require('../assets/images/Mountain.jpeg')}
      resizeMode="contain"
      style={styles.backgroundImg}
    />
    // <View style={styles.backgroundImg}>
    //   <FlyingBirds />
    // </View>
  );
};

const styles = StyleSheet.create({
  backgroundImg: {
    ...BackgroundImgStyle.position,
  },
});

export default BackGroundImg;
