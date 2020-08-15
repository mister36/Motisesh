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

// Storage
import RNFetchBlob from 'rn-fetch-blob';

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
  const [screenGreeting, setScreenGreeting] = React.useState('');

  React.useEffect(() => {
    setQuoteInfo(generateQuote());
  }, []);

  React.useEffect(() => {
    setScreenGreeting(greeting(state.name));
  }, []);

  return (
    <View style={styles.container}>
      <BackgroundImg />
      <Header navigation={navigation} />
      <Text style={styles.mainHeader}>{screenGreeting}</Text>
      {quoteInfo.length > 0 ? (
        <QuoteCard
          quoteText={quoteInfo[0].quote}
          author={quoteInfo[0].author}
          imgSource={quoteInfo[1]}
        />
      ) : null}
      <NewSession navigation={navigation} />
      <Button
        title="download"
        onPress={() => {
          console.log('downloading');
          RNFetchBlob.config({
            path: `${RNFetchBlob.fs.dirs.DocumentDir}/tunnel.mp4`,
          })
            .fetch('GET', `http://192.168.1.73:4000/api/v1/audio/test-video`)
            .then(res => console.log('File saved to ' + res.path()));
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
