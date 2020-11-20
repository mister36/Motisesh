import * as React from 'react';
import {View, Text, StyleSheet, Pressable, Platform, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Video from 'react-native-video';

import {Easing} from 'react-native-reanimated';

import {AnimatedCircularProgress} from 'react-native-circular-progress';

// In app subscription
import * as RNIap from 'react-native-iap';
import Iaphub from 'react-native-iaphub';

import DeviceInfo from 'react-native-device-info';

import Modal from 'react-native-modal';

import BackgroundTimer from 'react-native-background-timer';
import MusicControl from 'react-native-music-control';

// import SessionSlider from '../components/SessionSlider';
// import SongButton from '../components/SongButton';

// import {useSessionStore} from '../zustand/store';

const StatsScreen = () => {
  // const [musicPlaying, setMusicPlaying] = React.useState(false);
  const [counter, setCounter] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const itemSkus = Platform.select({
    android: ['motisesh.test_subscription_1'],
  });

  // React.useEffect(() => {
  //   const productGetter = async () => {
  //     try {
  //       const connectResults = await RNIap.initConnection();
  //       console.log('results: ', connectResults);
  //       const products = await RNIap.getSubscriptions(itemSkus);
  //       console.log(products);
  //     } catch (error) {
  //       console.log('IAP error: ', error);
  //     }
  //   };
  //   productGetter();
  // }, [counter]);

  // React.useEffect(() => {
  //   BackgroundTimer.start();
  // }, []);

  // React.useEffect(() => {
  //   BackgroundTimer.start();
  //   const intervalID = BackgroundTimer.setInterval(() => {
  //     //code that will be called every 3 seconds
  //     console.log('running');
  //   }, 1000);

  //   // return () => BackgroundTimer.clearInterval(intervalID)
  // }, []);

  // Setting User Id for subscription
  // const setUserIdForSubscription = async () => {
  //   const uniqueId = DeviceInfo.getUniqueId();
  //   try {
  //     await Iaphub.setUserId(uniqueId);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // // GETTING SUBSCRIPTION
  // const getSubDetails = async () => {
  //   try {
  //     await setUserIdForSubscription();
  //     const products = await Iaphub.getActiveProducts();
  //     console.log(products);
  //   } catch (error) {
  //     console.log('IAP error: ', error);
  //     // console.log(error.code);
  //   }
  // };

  // React.useEffect(() => {
  //   const runSubDetails = async () => {
  //     try {
  //       await getSubDetails();
  //     } catch (error) {
  //       console.log('uh oh');
  //     }
  //   };
  //   runSubDetails();
  // }, [counter]);

  return (
    <View>
      {/* <Video
        source={{
          uri:
            'https://www.motisesh.com/api/v1/audio/background.mp3?name=hero2',
        }}
        playInBackground
        playWhenInactive
        ignoreSilentSwitch="ignore"
        onLoad={data => {
          MusicControl.setNowPlaying({
            title: 'Moti Session',
            artist: 'Motisesh',
            duration: data.duration,
          });
        }}
        onEnd={() => {
          MusicControl.stopControl();
        }}
        progressUpdateInterval={5000}
        onProgress={() => {
          console.log('still running');
        }}
      /> */}
      {/* <Image
        // source={{uri: 'ninja'}}
        source={require('../assets/images/ninja.png')}
        style={{
          height: wp(50), // w:h = 6:7
          width: wp(50),
          // alignSelf: 'center',
        }}
      /> */}
      {/* <Pressable
        style={{height: hp(20), width: wp(50), backgroundColor: 'orange'}}
        onPress={() => {
          BackgroundTimer.stop();
          // setCounter(counter === 0 ? 1 : 0);
        }}
        // onPress={() => setMusicPlaying(musicPlaying ? false : true)}
      /> */}
      {/* <Modal
        isVisible={modalVisible}
        // isVisible
        onBackdropPress={() => setModalVisible(false)}>
        <View
          style={{height: hp(20), width: wp(50), backgroundColor: 'white'}}
        />
      </Modal> */}
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
