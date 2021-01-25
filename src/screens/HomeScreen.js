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
import axiosBase from '../utils/axiosBase';
import {sameDate} from '../utils/helpers';

import Spacer from '../components/Spacer';
import CalendarStrip from '../components/CalendarStrip';
import GoalBox from '../components/GoalBox';

const greatMarginLeft = wp(5);

const HomeScreen = () => {
  const now = DateTime.local().toFormat('ccc d LLL');
  // store
  const [name, token] = useAuthStore(state => [state.name, state.token]);
  // state
  const [selectedDate, setSelectedDate] = useState(DateTime.local());
  const [goals, setGoals] = useState([]);

  // Fetches goals
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const goals = await axiosBase.get('/goals', {
          headers: {
            token,
          },
        });
        setGoals(goals.data.goals);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGoals();
  }, []);
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
      <View style={styles.goalContainer}>
        <Text style={styles.goalHeader}>Today's Goals</Text>
        <FlatList
          horizontal
          data={goals}
          keyExtractor={item => item._id}
          renderItem={({item, index}) => {
            const date = DateTime.fromISO(item.dateEnd);
            if (sameDate(date, selectedDate)) {
              return (
                <GoalBox
                  title={item.description}
                  date={date}
                  type={item.type}
                />
              );
            }
          }}
        />
        {/* <GoalBox /> */}
      </View>
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
    fontFamily: 'Montserrat-Medium',
    color: '#E26452',
    fontSize: wp(3.75),
  },
  greeting: {
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(10),
  },
  infoText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: wp(5),
    marginTop: hp(1),
  },
  goalContainer: {
    marginLeft: greatMarginLeft,
  },
  goalHeader: {
    fontFamily: 'Montserrat-Bold',
    fontSize: wp(5),
    marginBottom: hp(2),
  },
});

export default HomeScreen;
