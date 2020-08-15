import * as React from 'react';
import {View, Text} from 'react-native';
import Video from 'react-native-video';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import RNFetchBlob from 'rn-fetch-blob';

const StatsScreen = () => {
  return (
    <View>
      <Video
        // source={{
        //   uri:
        //     'https://github.com/mediaelement/mediaelement-files/blob/master/echo-hereweare.mp4?raw=true',
        // }}
        // source={{uri: 'http://192.168.1.73:4000/api/v1/audio/test-video'}}
        source={{uri: `file:///${RNFetchBlob.fs.dirs.DocumentDir}/tunnel.mp4`}}
        style={{height: hp(100)}}
        resizeMode="cover"
        repeat
        onError={error => console.log(error)}
        onLoadStart={() => console.log('load started')}
        progressUpdateInterval={1000}
        onLoad={() => {
          console.log('background loaded');
        }}
        onProgress={data => console.log(data)}
      />
    </View>
  );
};

export default StatsScreen;
