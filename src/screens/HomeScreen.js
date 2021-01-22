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

import {DateTime} from 'luxon';

import {useAuthStore} from '../zustand/store';

import Spacer from '../components/Spacer';
import CalendarStrip from '../components/CalendarStrip';
import DayComponent from '../components/DayComponent';

const greatMarginLeft = wp(5);

const HomeScreen = () => {
  const now = DateTime.local().toFormat('ccc d LLL');
  // store
  const [name] = useAuthStore(state => [state.name]);
  // state
  const [selectedDate, setSelectedDate] = useState(DateTime.local());
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.dateHeaderText}>{now.toUpperCase()}</Text>
        <Text style={styles.greeting}>Hi, {name}</Text>
        <Text style={styles.infoText}>YOUR INFO</Text>
      </View>

      <Spacer margin={hp(2.5)} />
      <CalendarStrip
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <Spacer margin={hp(2)} />
      <Text style={styles.goalHeader}>Today's Goals</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFBFB',
    flex: 1,
  },
  header: {
    marginLeft: greatMarginLeft,
    marginTop: hp(5),
  },
  dateHeaderText: {
    fontFamily: 'Poppins-Medium',
    color: '#E26452',
    fontSize: wp(3.75),
  },
  greeting: {
    fontFamily: 'Poppins-Medium',
    fontSize: wp(10),
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: wp(5),
    marginTop: -hp(1),
  },
  goalHeader: {
    marginLeft: greatMarginLeft,
    fontFamily: 'Poppins-Bold',
    fontSize: wp(5),
  },
});

export default HomeScreen;
