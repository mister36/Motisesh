import * as React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Video from 'react-native-video';

import {Easing} from 'react-native-reanimated';

import {AnimatedCircularProgress} from 'react-native-circular-progress';

// In app subscription
import Iaphub from 'react-native-iaphub';

import DeviceInfo from 'react-native-device-info';

// import SessionSlider from '../components/SessionSlider';
// import SongButton from '../components/SongButton';

// import {useSessionStore} from '../zustand/store';

const StatsScreen = () => {
  // const [musicPlaying, setMusicPlaying] = React.useState(false);
  const [counter, setCounter] = React.useState(0);

  // Setting User Id for subscription
  const setUserIdForSubscription = async () => {
    const uniqueId = DeviceInfo.getUniqueId();
    console.log('UNIQUE ID: ', uniqueId);
    try {
      await Iaphub.setUserId(uniqueId);
    } catch (error) {
      console.log(error);
    }
  };
  // GETTING SUBSCRIPTION
  const getSubDetails = async () => {
    try {
      await setUserIdForSubscription();
      const products = await Iaphub.getProductsForSale();
      console.log(products);
    } catch (error) {
      console.log('IAP error: ', error);
    }
  };

  React.useEffect(() => {
    const runSubDetails = async () => {
      try {
        await getSubDetails();
      } catch (error) {
        console.log('uh oh');
      }
    };
    runSubDetails();
  }, [counter]);

  return (
    <View>
      <Pressable
        style={{height: hp(20), width: wp(50), backgroundColor: 'orange'}}
        onPress={() => setCounter(0 ? 1 : 0)}
        // onPress={() => setMusicPlaying(musicPlaying ? false : true)}
      />
      {/* {musicPlaying ? (
        <Video
          source={{
            // uri:
            // 'https://opus-codec.org/static/examples/samples/speech_orig.wav',
            uri:
              'https://www.motisesh.com/api/v1/audio/voice.mp3?firstName=adam&genre=hero',
          }}
          playInBackground={true}
          playWhenInactive={true}
          ignoreSilentSwitch="ignore"
          onLoad={data => console.log(data)}
          onError={error => {
            console.log('Session error: ', error);
          }}
        />
      ) : null} */}
    </View>
  );
};

const styles = StyleSheet.create({
  topScreen: {
    marginTop: hp(6),
  },
  buttonContainer: {
    marginTop: hp(4),
  },
});

export default StatsScreen;
