import * as React from 'react';
import Video from 'react-native-video';
import MusicControl from 'react-native-music-control';

const PlayMusic = () => {
  return (
    <Video
      source={{
        uri: 'http://192.168.1.73:4000/api/v1/audio',
      }}
      audioOnly={true}
      playInBackground={true}
      playWhenInactive={true}
      poster="https://baconmockup.com/300/200/"
      onProgress={data => console.log(data)}
      onLoad={data => {
        MusicControl.enableControl('play', true, {interval: 5});

        MusicControl.setNowPlaying({
          title: 'Cheer session',
        });
      }}
      //   paused={true}
    />
  );
};

export default PlayMusic;
