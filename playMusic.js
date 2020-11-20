import * as React from 'react';
import {AppState} from 'react-native';
import Video from 'react-native-video';

// Storage
import AsyncStorage from '@react-native-community/async-storage';

// Timer
import BackgroundTimer from 'react-native-background-timer';

// Store
import {useSessionStore} from './src/zustand/store';
import shallow from 'zustand/shallow';

// Music controls
import MusicControl from 'react-native-music-control';
import {Platform} from 'react-native';

const PlayMusic = () => {
  // Store state
  const [
    soundUrlBase,
    sessionUrlBase,
    sessionPaused,
    shouldSessionPause,
    shouldVoicePlay,
    currentSessionURL,
    currentVoiceSessionURL,
    durationOfSessionSetter,
    currentSessionTimeSetter,
    sessionName,
    shouldSessionEnd,
  ] = useSessionStore(
    state => [
      state.soundUrlBase,
      state.sessionUrlBase,
      state.sessionPaused,
      state.shouldSessionPause,
      state.shouldVoicePlay,
      state.currentSessionURL,
      state.currentVoiceSessionURL,
      state.durationOfSessionSetter,
      state.currentSessionTimeSetter,
      state.sessionName,
      state.shouldSessionEnd,
    ],
    shallow,
  );

  // console.log('shouldVoicePlay: ', shouldVoicePlay);
  // console.log('not shouldVoicePlay: ', sessionPaused);
  // console.log('right after ', useSessionStore);

  // Refs
  const appState = React.useRef(AppState.currentState);
  const backgroundMusicRef = React.useRef('backgroundMusicRef');
  const voiceRef = React.useRef('voiceRef');
  const soundRef = React.useRef('soundRef');
  const durationRef = React.useRef(0);

  const voiceTimerRef = React.useRef('voiceTimerRef');
  const soundTimerRef = React.useRef('soundTimerRef');

  // State
  const [appStateVisible, setAppStateVisible] = React.useState(
    appState.current,
  );
  const [
    backgroundTimerAlreadyStarted,
    setBackgroundTimerAlreadyStarted,
  ] = React.useState(false);
  const [googleVoiceShouldPlay, setGoogleVoiceShouldPlay] = React.useState(
    false,
  );
  const [shouldFirstVoice, setShouldFirstVoice] = React.useState(true);
  const [name, setName] = React.useState('');
  const [soundEffectPlaying, setSoundEffectPlaying] = React.useState(false);
  const [soundEffectVolume, setSoundEffectVolume] = React.useState(0.3);

  // Available sound effects
  const heroSoundEffects = [
    'explosion',
    'horse',
    'sword_fight',
    'tiger',
    'war_chant',
  ];
  const riseSoundEffects = ['yes_chant', 'tomorrow_chant'];

  // function that sets volume for sound effect
  const soundEffectVolumeSetter = effectName => {
    // console.log(`effectName: ${effectName}`);
    switch (effectName) {
      case 'war_chant':
        setSoundEffectVolume(1);
      case 'horse':
        setSoundEffectVolume(0.3);
      default:
        setSoundEffectVolume(0.6);
    }
  };

  // sets users name for session
  React.useEffect(() => {
    const getFirstName = async () => {
      try {
        const firstName = await AsyncStorage.getItem('name');
        // name = firstName;
        setName(firstName);
      } catch (error) {
        console.log('FIRST NAME ERROR', error);
        return 'Bob';
      }
    };
    getFirstName();
  }, []);

  React.useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  });

  const _handleAppStateChange = nextAppState => {
    if (
      appState.current === 'active' &&
      nextAppState.match(/inactive|background/)
    ) {
      console.log('App going to background');
    }
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log('AppState', appState.current);
  };

  // Sets listeners for iOS control center actions
  React.useEffect(() => {
    MusicControl.on('play', () => {
      shouldSessionPause(false);
    });

    MusicControl.on('pause', () => {
      shouldSessionPause(true);
    });
  }, []);

  // soundArray
  const soundArray = sessionName.toLowerCase().includes('hero')
    ? heroSoundEffects
    : riseSoundEffects;

  // Starts background timer on iOS
  // React.useEffect(() => {
  //   if (Platform.OS === 'ios') {
  //     if (!backgroundTimerAlreadyStarted) {
  //       BackgroundTimer.start();
  //       setBackgroundTimerAlreadyStarted(true);
  //     } else {
  //       // Voice timer
  //       if (!shouldFirstVoice && !sessionPaused) {
  //         const voiceOnTimer = BackgroundTimer.setTimeout(() => {
  //           if (!googleVoiceShouldPlay) {
  //             setGoogleVoiceShouldPlay(true);
  //           }
  //         }, 7000);

  //         // Sound effect timer

  //         // const soundEffectTimer = BackgroundTimer.setTimeout(() => {
  //         //   // will select a random sound effect from array, pass to Video component

  //         //   console.log('do something');
  //         //   if (!soundEffectPlaying) {
  //         //     const randomNum = Math.floor(Math.random() * soundArray.length);

  //         //     // sets volume
  //         //     soundEffectVolumeSetter(soundArray[randomNum]);
  //         //     console.log('sound changing');
  //         //     setSoundEffectPlaying(
  //         //       `${soundUrlBase}?name=${soundArray[randomNum]}`,
  //         //     );
  //         //   }
  //         // }, 15000);

  //         return () => {
  //           console.log('clearing timeouts');
  //           BackgroundTimer.clearTimeout(voiceOnTimer);
  //           // BackgroundTimer.clearTimeout(soundEffectTimer);
  //           BackgroundTimer.stop();
  //         };
  //       }
  //     }
  //   }
  // }, [
  //   shouldFirstVoice,
  //   sessionPaused,
  //   googleVoiceShouldPlay,
  //   // soundEffectPlaying,
  // ]);

  // IDEA
  // video tracks every time sound should play after onProgress
  // video paused
  // video unpaused
  // onProgress ran, if time isn't greater than last predicted recorded time don't play, set interval to time needed
  // reset interval

  // pleajssse
  // React.useEffect(() => {
  //   const soundEffectTimer = BackgroundTimer.setTimeout(() => {
  //     // will select a random sound effect from array, pass to Video component

  //     console.log('do something');
  //     if (!soundEffectPlaying && !sessionPaused) {
  //       const randomNum = Math.floor(Math.random() * soundArray.length);

  //       // sets volume
  //       soundEffectVolumeSetter(soundArray[randomNum]);
  //       console.log('sound changing');
  //       setSoundEffectPlaying(`${soundUrlBase}?name=${soundArray[randomNum]}`);
  //     }
  //   }, 15000);

  //   return () => BackgroundTimer.clearTimeout(soundEffectTimer);
  // }, [soundEffectPlaying, sessionPaused]);

  // // Voice timer
  // React.useEffect(() => {
  //   // only after name is set and session is playing
  //   if (!shouldFirstVoice && !sessionPaused && Platform.OS === 'android') {
  //     // console.log('THIS TIMER SHOULD BE RUNNING');
  //     const voiceOnTimer = BackgroundTimer.setTimeout(() => {
  //       // console.log(`voiceRef.volume: ${voiceRef.current.volume}`);
  //       if (!googleVoiceShouldPlay) {
  //         setGoogleVoiceShouldPlay(true);
  //       }
  //     }, 7000);

  //     return () => BackgroundTimer.clearTimeout(voiceOnTimer);
  //   }
  // }, [shouldFirstVoice, sessionPaused, googleVoiceShouldPlay]);

  // // Sound effect timer
  // React.useEffect(() => {
  //   // only after name is set and session is playing
  //   if (!shouldFirstVoice && !sessionPaused && Platform.OS === 'android') {
  //     const soundArray = sessionName.toLowerCase().includes('hero')
  //       ? heroSoundEffects
  //       : riseSoundEffects;

  //     const soundEffectTimer = BackgroundTimer.setInterval(() => {
  //       // will select a random sound effect from array, pass to Video component
  //       const randomNum = Math.floor(Math.random() * soundArray.length);

  //       // sets volume
  //       console.log('THIS SHOULDNT RUN');
  //       soundEffectVolumeSetter(soundArray[randomNum]);
  //       setSoundEffectPlaying(`${soundUrlBase}?name=${soundArray[randomNum]}`);
  //     }, 15000);

  //     return () => BackgroundTimer.clearInterval(soundEffectTimer);
  //   }
  // }, [shouldFirstVoice, sessionPaused]);

  return (
    <>
      <Video
        source={{
          // uri:
          //   'https://raw.githubusercontent.com/anars/blank-audio/master/2-seconds-and-500-milliseconds-of-silence.mp3',
          uri: currentSessionURL,
        }}
        ref={backgroundMusicRef}
        // audioOnly={true}
        playInBackground={true}
        playWhenInactive={true}
        progressUpdateInterval={100}
        volume={0.9}
        ignoreSilentSwitch="ignore"
        // mixWithOthers="duck"
        disableFocus
        rate={1}
        onLoad={data => {
          durationOfSessionSetter(data.duration);
          if (Platform.OS === 'ios') {
            MusicControl.setNowPlaying({
              title: 'Moti Session',
              artist: 'Motisesh',
              duration: data.duration,
            });
          }

          console.log('loadeed');
        }}
        onProgress={data => {
          // ONLY UPDATES UI OF PERILOGO WHILE APP IS ACTIVE, NEEDED OR IOS WILL CRASH
          if (appStateVisible === 'active') {
            currentSessionTimeSetter(data.currentTime);
          }

          durationRef.current = data.currentTime;
          // console.log('data');
          // setGoogleVoiceShouldPlay(true);
        }}
        onEnd={() => {
          console.log('ended');
          shouldSessionEnd();
        }}
        onPlaybackRateChange={({playbackRate}) => {
          if (Platform.OS === 'ios' && playbackRate === 1) {
            MusicControl.updatePlayback({
              state: MusicControl.STATE_PLAYING,
              speed: 1,
              elapsedTime: durationRef.current,
            });
          } else if (Platform.OS === 'ios' && playbackRate === 0) {
            MusicControl.updatePlayback({
              state: MusicControl.STATE_PAUSED,
              elapsedTime: durationRef.current,
            });
          }
        }}
        // Paused if the session is paused or the starting google voice is playing
        paused={sessionPaused || shouldFirstVoice ? true : false}
        // muted
      />

      {/* Timer for voice */}
      <Video
        source={{uri: `${sessionUrlBase}?name=silence`}}
        playInBackground
        playWhenInactive
        ignoreSilentSwitch="ignore"
        muted
        progressUpdateInterval={10000}
        onProgress={() => {
          setGoogleVoiceShouldPlay(true);
        }}
        paused={sessionPaused || shouldFirstVoice ? true : false}
      />

      {/* Timer for sound */}
      <Video
        source={{uri: `${sessionUrlBase}?name=silence`}}
        playInBackground
        playWhenInactive
        ignoreSilentSwitch="ignore"
        muted
        ref={soundTimerRef}
        progressUpdateInterval={15000}
        onProgress={data => {
          const randomNum = Math.floor(Math.random() * soundArray.length);

          // sets volume
          soundEffectVolumeSetter(soundArray[randomNum]);
          setSoundEffectPlaying(
            `${soundUrlBase}?name=${soundArray[randomNum]}`,
          );
        }}
        // onPlaybackRateChange={({playbackRate}) => {
        //   if (playbackRate !== 0) {
        //     soundRef.current.setNativeProps({progressUpdateInterval: 15000});
        //   }
        // }}
        paused={sessionPaused || shouldFirstVoice ? true : false}
      />

      {googleVoiceShouldPlay ? (
        <Video
          source={{
            // currentVoiceSessionURL = https://motisesh/api/v1/audio/voice.mp3?genre=hero&firstName=
            uri: `${currentVoiceSessionURL}&firstName=${name}`,
          }}
          playInBackground={true}
          playWhenInactive={true}
          ignoreSilentSwitch="ignore"
          volume={1}
          onLoad={() => {
            // shouldVoicePlay(true);
            backgroundMusicRef.current.setNativeProps({volume: 0.3});
          }}
          ref={voiceRef}
          onEnd={() => {
            // shouldVoicePlay(false);
            setGoogleVoiceShouldPlay(false);
            backgroundMusicRef.current.setNativeProps({volume: 0.9});
          }}
          paused={sessionPaused}
        />
      ) : null}

      {name.length > 0 && shouldFirstVoice ? (
        <Video
          source={{
            uri: `${currentVoiceSessionURL}&firstName=${name}&firstVoice=true`,
            // uri: 'https://motisesh.com/api/v1/audio/background.opus?name=hero2',
          }}
          playInBackground={true}
          playWhenInactive={true}
          ignoreSilentSwitch="ignore"
          onError={error => {
            console.log('error', error);
          }}
          onLoad={data => {
            console.log('voice loadeed');
          }}
          onEnd={() => {
            // shouldVoicePlay(false);
            setShouldFirstVoice(false);
          }}
          paused={sessionPaused}
        />
      ) : null}

      {soundEffectPlaying ? (
        <Video
          source={{uri: soundEffectPlaying}}
          playInBackground
          playWhenInactive
          ignoreSilentSwitch="ignore"
          disableFocus
          // volume={0.05}
          volume={soundEffectVolume}
          onLoad={() => console.log('sound is loaded')}
          onEnd={() => setSoundEffectPlaying(false)}
          paused={sessionPaused}
          onError={error => {
            console.log('sound effect error: ', error);
          }}
        />
      ) : null}
    </>
  );
};

export default PlayMusic;
