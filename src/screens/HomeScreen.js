import * as React from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';
import Video from 'react-native-video';

// Components
import QuoteCard from '../components/QuoteCard';
import Header from '../components/Header';
import BackgroundImg from '../components/BackgroundImg';
import NewSession from '../components/NewSession';

import AuthContext from '../context/AuthContext';
import SessionContext from '../context/SessionContext';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import greeting from '../utils/greeting';
import generateQuote from '../utils/generateQuote';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import MusicControl from 'react-native-music-control';

// File access
import RNFetchBlob from 'rn-fetch-blob';

const HomeScreen = ({navigation}) => {
  const {state} = React.useContext(AuthContext);
  const {state: sessState, sessionPlaying} = React.useContext(SessionContext);

  const [quoteInfo, setQuoteInfo] = React.useState([]);

  React.useEffect(() => {
    setQuoteInfo(generateQuote());
  }, []);

  // console.log(new Wakeful.isHeld());

  return (
    <View>
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
        title="Press"
        onPress={() => {
          if (sessState.sessionPlaying) {
            sessionPlaying(false);
            MusicControl.stopControl();
            // VIForegroundService.stopService().then(() =>
            //   console.log('stopped'),
            // );
          } else {
            sessionPlaying(true);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainHeader: {
    fontFamily: 'Lato-Bold',
    fontSize: hp(3),
    margin: hp(2),
    marginLeft: wp(5),
  },
});

export default HomeScreen;
