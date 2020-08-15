import * as React from 'react';
import {View} from 'react-native';
import Video from 'react-native-video';
import VIForegroundService from '@voximplant/react-native-foreground-service';
// import timer from 'react-native-timer';

import AuthContext from './src/context/AuthContext';

const PlayMusic = () => {
  const {
    state: {name},
  } = React.useContext(AuthContext);

  // Refs
  const backgroundMusicRef = React.useRef('backgroundMusicRef');
  const voiceRef = React.useRef('voiceRef');

  // State
  const [backgroundMusicPaused, setBackgroundMusicPaused] = React.useState(
    true,
  );
  const [googleVoice, setGoogleVoice] = React.useState(false);

  React.useEffect(() => {
    const channelConfig = {
      id: 'channelId',
      name: 'Channel name',
      description: 'Channel description',
      enableVibration: false,
      importance: 4,
    };
    VIForegroundService.createNotificationChannel(channelConfig);
  }, []);

  React.useEffect(() => {
    const startForegroundService = async () => {
      const notificationConfig = {
        channelId: 'channelId',
        id: 3456,
        title: 'Cheer Session',
        text: 'Currently playing a session',
        icon: 'ic_icon',
        priority: 1,
      };

      try {
        await VIForegroundService.startService(notificationConfig);
      } catch (error) {
        console.error(error);
      }
    };
    startForegroundService();
  }, []);

  return (
    <View>
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
        onLoad={data => {
          console.log('loadeed');
        }}
        onProgress={data => {
          setGoogleVoice(true);
        }}
        paused={backgroundMusicPaused}
      />

      {googleVoice ? (
        <Video
          source={{
            uri: `http://192.168.1.73:4000/api/v1/audio/voice?name=${name}`,
          }}
          audioOnly
          // ref={voiceRef}
          playInBackground={true}
          playWhenInactive={true}
          onLoad={() => {
            backgroundMusicRef.current.setNativeProps({volume: 0.3});
          }}
          onEnd={() => {
            setGoogleVoice(false);
            backgroundMusicRef.current.setNativeProps({volume: 0.6});
          }}
        />
      ) : null}

      {backgroundMusicPaused ? (
        <Video
          source={{
            uri: `http://192.168.1.73:4000/api/v1/audio/voice?name=${name}&firstVoice=true`,
          }}
          audioOnly={true}
          playInBackground={true}
          playWhenInactive={true}
          progressUpdateInterval={1000}
          onLoad={data => {
            console.log('voice loadeed');
          }}
          onEnd={() => setBackgroundMusicPaused(false)}
        />
      ) : null}
    </View>
  );
};

export default PlayMusic;
