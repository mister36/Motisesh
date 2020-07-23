import * as React from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';

// Components
import BottomMusic from '../components/BottomMusic';
import SessionPlaying from '../components/SessionPlaying';
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

// File access
import RNFetchBlob from 'rn-fetch-blob';

const HomeScreen = ({navigation}) => {
  const {state} = React.useContext(AuthContext);
  const {state: sessState, sessionPlaying} = React.useContext(SessionContext);

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

      {/* {!sessState.sessionPlaying ? (
        <BottomMusic onPress={() => navigation.navigate('Music')} />
      ) : null} */}

      {/* <Button
        title="Press"
        onPress={() => {
          if (sessState.sessionPlaying) {
            sessionPlaying(false);
            MusicControl.stopControl();
          } else {
            sessionPlaying(true);
          }
        }}
      /> */}
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
