import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {useAuthStore} from '../zustand/store';

import Spacer from '../components/Spacer';

const HomeScreen = () => {
  const [name] = useAuthStore(state => [state.name]);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.dateHeaderText}>TUES 13 OCT</Text>
        <Text style={styles.greeting}>Hi, {name}</Text>
        <Text style={styles.infoText}>YOUR INFO</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 10,
  },
  header: {
    marginLeft: wp(5),
    marginTop: hp(5),
  },
  dateHeaderText: {
    fontFamily: 'Poppins-Medium',
    color: '#E26452',
  },
  greeting: {
    fontFamily: 'Poppins-Medium',
    fontSize: wp(10),
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: wp(5),
  },
});

export default HomeScreen;
