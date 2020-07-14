import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

// Components
import QuoteCard from '../components/QuoteCard';
import Header from '../components/Header';
import BackgroundImg from '../components/BackgroundImg';
import NewSession from '../components/NewSession';

import AuthContext from '../context/AuthContext';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import greeting from '../utils/greeting';
import generateQuote from '../utils/generateQuote';

const HomeScreen = ({navigation}) => {
  const {state} = React.useContext(AuthContext);
  const [quoteInfo, setQuoteInfo] = React.useState([]);

  React.useEffect(() => {
    setQuoteInfo(generateQuote());
  }, []);

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
