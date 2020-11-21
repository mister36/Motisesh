import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import Video from 'react-native-video';

// Animated
import Animated, {
  useCode,
  Value,
  Clock,
  Easing,
  set,
} from 'react-native-reanimated';

// Background timer
import BackgroundTimer from 'react-native-background-timer';

// store
import {useSessionStore} from '../zustand/store';

// Styling
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import LottieView from 'lottie-react-native';
import shallow from 'zustand/shallow';

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const SessionAnimation = () => {
  // Store
  const [sessionUrlBase, sessionPaused] = useSessionStore(
    state => [state.sessionUrlBase, state.sessionPaused],
    shallow,
  );
  // State
  const [lightningVisible, setLightningVisible] = React.useState(false);
  const [explodeVisible, setExplodeVisible] = React.useState(false);
  const [playChant, setPlayChant] = React.useState(false);

  // Ref
  const chantRef = React.useRef('chantRef');

  React.useEffect(() => {
    // console.log('received voice state change');
    return useSessionStore.subscribe(
      voicePlaying => {
        // console.log('state.voicePlayig: ', voicePlaying);
        if (voicePlaying === true) {
          chantRef.current.setNativeProps({muted: true});
        }
      },
      state => state.voicePlaying,
    );
  }, []);

  // React.useEffect(() => {
  //   const lightningTimer = BackgroundTimer.setInterval(() => {
  //     setLightningVisible(true);
  //   }, 12000);

  //   return () => BackgroundTimer.clearInterval(lightningTimer);
  // }, [lightningVisible]);

  // React.useEffect(() => {
  //   const explodeTimer = BackgroundTimer.setInterval(() => {
  //     setExplodeVisible(true);
  //   }, 15000);

  //   return () => BackgroundTimer.clearInterval(explodeTimer);
  // }, [explodeVisible]);

  // React.useEffect(() => {
  //   const chantTimer = BackgroundTimer.setInterval(() => {
  //     setPlayChant(true);
  //   }, 40000);

  //   return () => BackgroundTimer.clearInterval(chantTimer);
  // }, []);

  return (
    <Animated.View style={[styles.container]}>
      {lightningVisible ? (
        <>
          <LottieView
            source={require('../assets/animations/lightning.json')}
            autoPlay
            loop={false}
            // progress={lightningVal}
            speed={1.5}
            onAnimationFinish={() => setLightningVisible(false)}
            style={[
              styles.lightning,
              {
                top: hp(randomIntFromInterval(-11, 13)),
              },
            ]}
          />
          <Video
            source={require('../assets/sound/thunder.mp3')}
            volume={0.6}
            rate={1.3}
            playInBackground
            playWhenInactive
          />
        </>
      ) : null}

      <Video
        source={{uri: `${sessionUrlBase}?name=silence`}}
        playInBackground
        playWhenInactive
        ignoreSilentSwitch="ignore"
        muted
        // ref={soundTimerRef}
        progressUpdateInterval={15000}
        onProgress={data => {
          setLightningVisible(true);
        }}
        // onPlaybackRateChange={({playbackRate}) => {
        //   if (playbackRate !== 0) {
        //     soundRef.current.setNativeProps({progressUpdateInterval: 15000});
        //   }
        // }}
        paused={sessionPaused ? true : false}
      />

      {/* {explodeVisible ? (
        <>
          <LottieView
            source={require('../assets/animations/smoke.json')}
            // speed={0.7}
            // duration={2.39}
            loop={false}
            onAnimationFinish={() => setExplodeVisible(false)}
            autoPlay
            style={{
              width: wp(100),
              top: hp(randomIntFromInterval(0, 28)),
              left: wp(randomIntFromInterval(-14, 14)),
            }}
          />
          <Video
            source={require('../assets/sound/smoke_sound.mp3')}
            playInBackground
            playWhenInactive
            // rate={2.9}
            // volume={0}
          />
        </>
      ) : null} */}

      {/* {playChant ? (
        <Video
          source={require('../assets/sound/war_chant.mp3')}
          playInBackground
          playWhenInactive
          onEnd={() => setPlayChant(false)}
          ref={chantRef}
          // rate={2.9}
          volume={0.5}
        />
      ) : null} */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 11,
    height: hp(80),
    // borderWidth: 2,
  },
  lightning: {
    height: hp(60),
    alignSelf: 'center',
    position: 'absolute',
  },
  blast: {
    position: 'absolute',
    height: hp(20),
  },
});

export default SessionAnimation;
