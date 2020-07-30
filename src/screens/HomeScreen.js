import * as React from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';

// Components
import QuoteCard from '../components/QuoteCard';
import Header from '../components/Header';
import BackgroundImg from '../components/BackgroundImg';
import NewSession from '../components/NewSession';

// Context
import AuthContext from '../context/AuthContext';
import SessionContext from '../context/SessionContext';

// Motion

// Styling
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// Utils
import greeting from '../utils/greeting';
import generateQuote from '../utils/generateQuote';

import MusicControl from 'react-native-music-control';
import VIForegroundService from '@voximplant/react-native-foreground-service';

const HomeScreen = ({navigation}) => {
  const {state} = React.useContext(AuthContext);
  const {
    state: sessState,
    sessionPlaying,
    toggleSessionPaused,
  } = React.useContext(SessionContext);

  const [quoteInfo, setQuoteInfo] = React.useState([]);

  React.useEffect(() => {
    setQuoteInfo(generateQuote());
  }, []);

  return (
    <View style={styles.container}>
      <BackgroundImg />
      <Header navigation={navigation} />
      <Text style={styles.mainHeader}>{greeting(state.name)}</Text>
      {quoteInfo.length > 0 ? (
        <QuoteCard
          quoteText={quoteInfo[0].quote}
          author={quoteInfo[0].author}
          imgSource={quoteInfo[1]}
        />
      ) : null}
      <NewSession navigation={navigation} />

      <Button
        title="Start"
        onPress={() => {
          if (sessState.sessionPlaying) {
            console.log('turning off');
            VIForegroundService.stopService();
            sessionPlaying(false);
          } else {
            sessionPlaying(true);
          }

          //   MusicControl.enableBackgroundMode(true);

          //   MusicControl.enableControl('play', true);
          //   MusicControl.enableControl('pause', true);

          //   MusicControl.setNowPlaying({
          //     title: 'Testing music',
          //     artist: 'TopCheer DJ',
          //     artwork: 'https://i.imgur.com/e1cpwdo.png',
          //   });
          //   MusicControl.updatePlayback({
          //     state: MusicControl.STATE_PLAYING,
          //   });

          //   MusicControl.on('closeNotification', val => {
          //     console.log('MUSIC PLAYER CLOSE');
          //     console.log(val);
          //   });
          //   MusicControl.on('stop', val => {
          //     console.log('MUSIC PLAYER STOPPED');
          //     console.log(val);
          //   });
          // }}
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainHeader: {
    fontFamily: 'Lato-Bold',
    fontSize: hp(3),
    margin: hp(2),
    marginLeft: wp(5),
  },
});

export default HomeScreen;
