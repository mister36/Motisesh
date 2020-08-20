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
      <Pressable
        style={[styles.column, {marginLeft: wp(5)}]}
        onPress={() => {
          navigation.navigate('Settings');
        }}>
        <MaterialCommunityIcons
          style={[styles.textIcon, styles.accountIcon]}
          name="account-details"
          color="#FFFFFF"
        />
        <Text style={styles.text}>Account</Text>
      </Pressable>

      <View style={styles.dotContainer}>
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
      </View>

      <Pressable
        style={[styles.column, {marginRight: wp(5)}]}
        onPress={() => {
          navigation.navigate('Stats');
        }}>
        <Feather
          name="bar-chart"
          style={[styles.textIcon, styles.statIcon]}
          color="#FFFFFF"
        />
        <Text style={styles.text}>Stats</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    marginTop: hp(4),
    width: wp(100),
    zIndex: 100,
  },
  column: {
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'NunitoSans-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: wp(4),
  },
  textIcon: {
    textAlign: 'center',
  },
  accountIcon: {
    fontSize: wp(12),
  },
  statIcon: {
    fontSize: wp(10),
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
