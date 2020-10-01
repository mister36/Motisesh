import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  InteractionManager,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Foundation from 'react-native-vector-icons/Foundation';

// store
import {useSessionStore} from '../zustand/store';

// Dimensions
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const SongButton = ({length, type, sessionTitle}) => {
  // store
  const [
    shouldSessionRun,
    testSessionAnimation,
    sendSessionName,
  ] = useSessionStore(state => [
    state.shouldSessionRun,
    state.testSessionAnimation,
    state.sendSessionName,
  ]);

  let uri;
  if (type === 'hero') {
    uri = 'battlefield';
  } else if (type === 'rise') {
    uri = 'blue_sword';
  }
  return (
    <Pressable
      onPress={() => {
        testSessionAnimation();
        sendSessionName(sessionTitle);
        // shouldSessionRun(sessionTitle);
      }}
      style={[
        styles.container,
        {height: length, width: length, borderRadius: length / 2},
      ]}>
      <Image
        source={{uri}}
        style={[
          {height: length, width: length, borderRadius: length / 2},
          styles.image,
        ]}
      />
      {/* <Text>Hero session</Text> */}
      <Foundation name="play" style={styles.playIcon} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: wp(27),
    // width: wp(27),
    // backgroundColor: 'rgba(255, 255, 255, .5)',
    // borderRadius: wp(13.5),
    justifyContent: 'center',
    // TODO: remove this margin
    // marginLeft: wp(5),
  },
  playIcon: {
    color: '#ffffff',
    fontSize: wp(13),
    alignSelf: 'center',
  },
  image: {
    position: 'absolute',
  },
});

export default SongButton;
