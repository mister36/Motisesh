import * as React from 'react';
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

const PlayMusic = () => {
  // Store state
  const [
    soundUrlBase,
    sessionPaused,
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
      state.sessionPaused,
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
  const backgroundMusicRef = React.useRef('backgroundMusicRef');
  const voiceRef = React.useRef('voiceRef');

  // State
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
    console.log(`effectName: ${effectName}`);
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

  // Voice timer
  React.useEffect(() => {
    // only after name is set and session is playing
    if (!shouldFirstVoice && !sessionPaused) {
      // console.log('THIS TIMER SHOULD BE RUNNING');
      const voiceOnTimer = BackgroundTimer.setTimeout(() => {
        // console.log(`voiceRef.volume: ${voiceRef.current.volume}`);
        if (!googleVoiceShouldPlay) {
          setGoogleVoiceShouldPlay(true);
        }
      }, 7000);

      return () => BackgroundTimer.clearTimeout(voiceOnTimer);
    }
  }, [shouldFirstVoice, sessionPaused, googleVoiceShouldPlay]);

  // Sound effect timer
  React.useEffect(() => {
    // only after name is set and session is playing
    if (!shouldFirstVoice && !sessionPaused) {
      const soundArray = sessionName.toLowerCase().includes('hero')
        ? heroSoundEffects
        : riseSoundEffects;
      const soundEffectTimer = BackgroundTimer.setInterval(() => {
        // will select a random sound effect from array, pass to Video component
        const randomNum = Math.floor(Math.random() * soundArray.length);

        // sets volume
        soundEffectVolumeSetter(soundArray[randomNum]);
        setSoundEffectPlaying(`${soundUrlBase}?name=${soundArray[randomNum]}`);
      }, 15000);

      return () => BackgroundTimer.clearInterval(soundEffectTimer);
    }
  }, [shouldFirstVoice, sessionPaused]);

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
        progressUpdateInterval={10000}
        volume={0.9}
        ignoreSilentSwitch="ignore"
        // mixWithOthers="duck"
        disableFocus
        rate={1}
        onLoad={data => {
          durationOfSessionSetter(data.duration);
          console.log('loadeed');
        }}
        onProgress={data => {
          currentSessionTimeSetter(data.currentTime);
          // setGoogleVoiceShouldPlay(true);
        }}
        onEnd={() => {
          console.log('ended');
          shouldSessionEnd();
        }}
        // Paused if the session is paused or the starting google voice is playing
        paused={sessionPaused || shouldFirstVoice ? true : false}
        // muted
      />

      {googleVoiceShouldPlay ? (
        <Video
          source={{
            // currentVoiceSessionURL = http://192.168.1.72:4000/api/v1/audio/voice?genre=hero&firstName=
            uri: `${currentVoiceSessionURL}&firstName=${name}`,
          }}
          // audioOnly
          // ref={voiceRef}
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
            // uri: 'http://192.168.1.72:4000/api/v1/audio/test.opus',
          }}
          // audioOnly={true}
          playInBackground={true}
          playWhenInactive={true}
          ignoreSilentSwitch="ignore"
          onError={error => {
            console.log('error', error);
          }}
          onLoad={data => {
            // shouldVoicePlay(true);
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
          onEnd={() => setSoundEffectPlaying(false)}
          paused={sessionPaused}
        />
      ) : null}
    </>
  );
};

export default PlayMusic;
