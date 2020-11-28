import React from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const HomeScreen = () => {
  return (
    <View>
      <StatusBar backgroundColor="#FF6F61" />
      <View style={styles.discoverBox}>
        <View style={styles.discoverBoxTopRow}>
          <Text style={styles.discoverHeader}>Discover</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  discoverBox: {
    backgroundColor: '#FF6F61',
    height: hp(40),
  },
  discoverBoxTopRow: {
    marginLeft: wp(5),
    marginTop: hp(2),
  },
  discoverHeader: {
    fontFamily: 'GalanoGrotesque-Bold',
    fontSize: 40,
    color: 'white',
  },
});

export default HomeScreen;
