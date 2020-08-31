import * as React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

// Icons
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Responsiveness
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const SessionNav = ({navigation}) => {
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
    // borderWidth: 1,
    height: hp(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 100,
  },
  column: {
    justifyContent: 'center',
    padding: wp(3),
    // borderWidth: 1,
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
    fontSize: wp(10),
  },
  statIcon: {
    fontSize: wp(9),
  },
});

export default SessionNav;
