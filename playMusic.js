import * as React from 'react';
import {View} from 'react-native';
import Video from 'react-native-video';
import MusicControl from 'react-native-music-control';
import VIForegroundService from '@voximplant/react-native-foreground-service';

const PlayMusic = () => {
  // const [paused, setPaused] = React.useState(false);

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
        title: 'TopCheer YahYah',
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
          uri: 'https://familycouncil.org/podcasts/MLKDreamSpeech.mp3',
          // uri: 'http://192.168.1.73:4000/api/v1/audio/mj',
        }}
        audioOnly={true}
        playInBackground={true}
        playWhenInactive={true}
        onLoad={data => {
          console.log('loadeed');
        }}
        onProgress={data => console.log(data)}
        // paused={paused}
      />
    </View>
  );
};

export default PlayMusic;
