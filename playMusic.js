import * as React from 'react';
import {View} from 'react-native';
import Video from 'react-native-video';
import VIForegroundService from '@voximplant/react-native-foreground-service';

import AuthContext from './src/context/AuthContext';

const PlayMusic = () => {
  const {
    state: {name},
  } = React.useContext(AuthContext);
  const videoRef = React.useRef('videoRef');
  const [paused, setPaused] = React.useState(true);

  React.useEffect(() => {
    const channelConfig = {
      id: 'channelId',
      name: 'Channel name',
      description: 'Channel description',
      enableVibration: false,
      importance: 5,
    };
    VIForegroundService.createNotificationChannel(channelConfig);
  }, []);

  React.useEffect(() => {
    const startForegroundService = async () => {
      const notificationConfig = {
        channelId: 'channelId',
        id: 3456,
        title: 'TestingCheer',
        text: 'Wrestling is back',
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
          // uri: 'https://familycouncil.org/podcasts/MLKDreamSpeech.mp3',
          uri: 'http://192.168.1.73:4000/api/v1/audio/background?duration=60',
        }}
        ref={videoRef}
        audioOnly={true}
        playInBackground={true}
        playWhenInactive={true}
        progressUpdateInterval={1000}
        onLoad={data => {
          console.log('loadeed');
        }}
        onProgress={data => {
          console.log(data);
          // if (data.currentTime > 10) {
          //   videoRef.current.setNativeProps({paused: true});
          // }
        }}
        paused={paused}
      />

      <Video
        source={{
          uri: `http://192.168.1.73:4000/api/v1/audio/voice?name=${name}`,
        }}
        audioOnly={true}
        playInBackground={true}
        playWhenInactive={true}
        progressUpdateInterval={1000}
        onLoad={data => {
          console.log('voice loadeed');
        }}
        onEnd={() => setPaused(false)}
      />
    </View>
  );
};

export default PlayMusic;
