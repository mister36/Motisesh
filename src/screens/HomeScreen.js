import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const HomeScreen = () => {
  return (
    <View>
      <Text style={{fontSize: 40, fontFamily: 'GalanoGrotesque-Bold'}}>
        Discover
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
