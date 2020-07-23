import * as React from 'react';
import Video from 'react-native-video';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import Wakeful from 'react-native-wakeful';
import MusicControl from 'react-native-music-control';

// const channelConfig = {
//   id: 'channelId',
//   name: 'Channel name',
//   description: 'Channel description',
//   enableVibration: false,
// };
// VIForegroundService.createNotificationChannel(channelConfig);

// const startForegroundService = async () => {
//   const notificationConfig = {
//     channelId: 'channelId',
//     id: 3456,
//     title: 'Yahyah',
//     text: 'Some text',
//     icon: 'ic_icon',
//   };
//   try {
//     await VIForegroundService.startService(notificationConfig);
//   } catch (e) {
//     console.error(e);
//   }
// };

const PlayMusic = () => {
  MusicControl.enableControl('play', true);
  let wakeful = new Wakeful();
  wakeful.acquire();
  return (
    <Video
      source={{
        uri: 'http://192.168.1.73:4000/api/v1/audio/background',
      }}
      audioOnly={true}
      playInBackground={true}
      playWhenInactive={true}
      onLoad={data => {
        MusicControl.setNowPlaying({
          title: 'I want Yahyah from kenwood. Freshman',
          artist: 'this guy',
        });

        console.log('loadeed');
        // startForegroundService();
      }}
      // paused={paused}
    />
  );
};

export default PlayMusic;
