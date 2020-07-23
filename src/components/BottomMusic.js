import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// Responsiveness
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const BottomMusic = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <Text>Cheer Session</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(7),
    width: wp(100),
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 2,
  },
});

export default BottomMusic;
