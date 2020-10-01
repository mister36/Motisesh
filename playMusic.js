import * as React from 'react';
import Video from 'react-native-video';

// Storage
import AsyncStorage from '@react-native-community/async-storage';

// Store
import {useSessionStore} from './src/zustand/store';
import shallow from 'zustand/shallow';

const PlayMusic = () => {
  // Store state
  const [
    sessionPaused,
    shouldVoicePlay,
    currentSessionURL,
    currentVoiceSessionURL,
    durationOfSessionSetter,
    currentSessionTimeSetter,
  ] = useSessionStore(
    state => [
      state.sessionPaused,
      state.shouldVoicePlay,
      state.currentSessionURL,
      state.currentVoiceSessionURL,
      state.durationOfSessionSetter,
      state.currentSessionTimeSetter,
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
  // console.log(
  //   'sessionPaused or shouldFirstVoice: ',
  //   sessionPaused || shouldFirstVoice,
  // );

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

  return (
    <>
      <Video
        source={{
          // uri:
          // 'https://file-examples-com.github.io/uploads/2017/11/file_example_OOG_1MG.ogg',
          uri: currentSessionURL,
        }}
        ref={backgroundMusicRef}
        audioOnly={true}
        playInBackground={true}
        playWhenInactive={true}
        progressUpdateInterval={10000}
        volume={1}
        rate={1}
        onLoad={data => {
          console.log('data from playMusc ', data);
          durationOfSessionSetter(data.duration);
          console.log('loadeed');
        }}
        onProgress={data => {
          currentSessionTimeSetter(data.currentTime);
          setGoogleVoiceShouldPlay(true);
        }}
        // Paused if the session is paused or the starting google voice is playing
        paused={sessionPaused || shouldFirstVoice ? true : false}
      />

      {googleVoiceShouldPlay ? (
        <Video
          source={{
            // currentVoiceSessionURL = http://192.168.1.72:4000/api/v1/audio/voice?genre=hero&firstName=
            uri: `${currentVoiceSessionURL}&firstName=${name}`,
          }}
          audioOnly
          ref={voiceRef}
          playInBackground={true}
          playWhenInactive={true}
          onLoad={() => {
            // shouldVoicePlay(true);
            backgroundMusicRef.current.setNativeProps({volume: 0.4});
          }}
          onEnd={() => {
            // shouldVoicePlay(false);
            setGoogleVoiceShouldPlay(false);
            backgroundMusicRef.current.setNativeProps({volume: 1});
          }}
          paused={sessionPaused}
        />
      ) : null}

      {name.length > 0 && shouldFirstVoice ? (
        <Video
          source={{
            uri: `${currentVoiceSessionURL}&firstName=${name}&firstVoice=true`,
          }}
          audioOnly={true}
          playInBackground={true}
          playWhenInactive={true}
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
    </>
  );
};

export default PlayMusic;
