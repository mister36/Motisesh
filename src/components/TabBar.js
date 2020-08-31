import * as React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

// Icons
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

// Responsiveness
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

//! TODO add animations
const TabBar = ({state, descriptors, navigation, position}) => {
  //   console.log('state: ', state.index);
  //   console.log('descriptors:', descriptors);
  return (
    <View style={styles.container}>
      {/* <View style={styles.dotContainer}> */}
      <View
        style={[
          styles.dot,
          {
            backgroundColor:
              state.index === 0 ? '#FFFFFF' : 'rgba(255, 255, 255, .4)',
          },
        ]}
      />
      <View
        style={[
          styles.dot,
          {
            backgroundColor:
              state.index === 1 ? '#FFFFFF' : 'rgba(255, 255, 255, .4)',
          },
        ]}
      />
      <View
        style={[
          styles.dot,
          {
            backgroundColor:
              state.index === 2 ? '#FFFFFF' : 'rgba(255, 255, 255, .4)',
          },
        ]}
      />
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 1,
    // borderColor: 'green',
    alignSelf: 'center',
    height: hp(3),
    position: 'absolute',
    marginTop: hp(5),
    width: wp(15),
    zIndex: 100,
  },
  dotContainer: {
    flexDirection: 'row',
    width: wp(12),
    justifyContent: 'space-between',
    position: 'absolute',
    alignSelf: 'center',
    left: wp(44),
  },
  dot: {
    height: wp(2.5),
    width: wp(2.5),
    borderRadius: wp(1.25),
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
  },
});

export default TabBar;
