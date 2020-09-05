import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// Notification
import {Notifications} from 'react-native-notifications';

// import {useSessionStore} from '../zustand/store';

const StatsScreen = () => {
  // const info = useSessionStore(state => state.sessionPaused);
  // console.log(info);
  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          height: hp(20),
          width: hp(20),
          alignSelf: 'center',
          top: hp(30),
        }}>
        <Text>Notification</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StatsScreen;
