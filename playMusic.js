import * as React from 'react';
import Video from 'react-native-video';

// Storage
import AsyncStorage from '@react-native-community/async-storage';

// Store
import {useSessionStore} from './src/zustand/store';
import shallow from 'zustand/shallow';

const PlayMusic = () => {
  // Store state
  const [sessionPaused, shouldVoicePlay] = useSessionStore(
    state => [state.sessionPaused, state.shouldVoicePlay],
    shallow,
  );

  // Refs
  const backgroundMusicRef = React.useRef('backgroundMusicRef');
  const voiceRef = React.useRef('voiceRef');

  // State
  const [googleVoiceShouldPlay, setGoogleVoiceShouldPlay] = React.useState(
    false,
  );
  const [name, setName] = React.useState('');
  const [shouldFirstVoice, setShouldFirstVoice] = React.useState(true);
  // console.log(
  //   'sessionPaused or shouldFirstVoice: ',
  //   sessionPaused || shouldFirstVoice,
  // );

  // Sets name for HTTP request
  React.useEffect(() => {
    const getName = async () => {
      try {
        const nameInStorage = await AsyncStorage.getItem('name');
        setName(nameInStorage);
      } catch (error) {
        console.error(error);
      }
    };
    getName();
  }, []);

  return (
    <>
      <Video
        source={{
          uri: 'http://192.168.1.73:4000/api/v1/audio/background',
        }}
        ref={backgroundMusicRef}
        audioOnly={true}
        playInBackground={true}
        playWhenInactive={true}
        progressUpdateInterval={10000}
        volume={0.6}
        rate={1}
        onLoad={data => {
          console.log('loadeed');
        }}
        onProgress={data => {
          setGoogleVoiceShouldPlay(true);
        }}
        // Paused if the session is paused or the starting google voice is playing
        paused={sessionPaused || shouldFirstVoice ? true : false}
      />

      {googleVoiceShouldPlay ? (
        <Video
          source={{
            uri: `http://192.168.1.73:4000/api/v1/audio/voice?name=${name}`,
          }}
          audioOnly
          ref={voiceRef}
          playInBackground={true}
          playWhenInactive={true}
          onLoad={() => {
            shouldVoicePlay(true);
            backgroundMusicRef.current.setNativeProps({volume: 0.3});
          }}
          onEnd={() => {
            shouldVoicePlay(false);
            setGoogleVoiceShouldPlay(false);
            backgroundMusicRef.current.setNativeProps({volume: 0.6});
          }}
          paused={sessionPaused}
        />
      ) : null}

      {name.length > 0 && shouldFirstVoice ? (
        <Video
          source={{
            uri: `http://192.168.1.73:4000/api/v1/audio/voice?name=${name}&firstVoice=true`,
          }}
          audioOnly={true}
          playInBackground={true}
          playWhenInactive={true}
          onLoad={data => {
            shouldVoicePlay(true);
            console.log('voice loadeed');
          }}
          onEnd={() => {
            shouldVoicePlay(false);
            setShouldFirstVoice(false);
          }}
          paused={sessionPaused}
        />
      ) : null}
    </>
  );
};

export default PlayMusic;
