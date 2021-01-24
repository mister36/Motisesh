import React from 'react';
import {View, StatusBar, Text, StyleSheet} from 'react-native';
import DayComponent from '../components/DayComponent';
import GoalForm from '../components/GoalForm';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      {/* <DayComponent /> */}
      <GoalForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileScreen;
