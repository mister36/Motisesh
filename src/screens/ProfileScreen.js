import React from 'react';
import {View, StatusBar, Text, StyleSheet} from 'react-native';
import DayComponent from '../components/DayComponent';
import MissionForm from '../components/MissionForm';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      {/* <DayComponent /> */}
      <MissionForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileScreen;
