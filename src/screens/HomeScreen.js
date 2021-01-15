import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
// import {ws, postMessage} from '../../socket';
import AsyncStorage from '@react-native-community/async-storage';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Spacer from '../components/Spacer';

const HomeScreen = () => {
  const [text, setText] = useState('');
  const [token, setToken] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  // NOTE: This is what the user sends to the bot
  const [userText, setUserText] = useState([]);

  /**
   * Sets when the last message was sent in storage
   */
  const setLastMessageTime = async () => {
    try {
      const now = Date.now();
      await AsyncStorage.setItem('last_message_time', JSON.stringify(now));
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   ws.addEventListener('message', message => {
  //     console.log(message);
  //   });

  //   return () => ws.removeEventListener('message');
  // }, []);

  /**
   * Posts message to MotiAPI
   */
  // const postMessage = message => {
  //   ws.send(message);
  //   setLastMessageTime();
  // };

  // TODO: Look into caching
  // useEffect(() => {
  //   ws.onmessage = message => {
  //     console.log(message);
  //     setNewMessage(JSON.parse(message.data).text);
  //   };

  //   return () => ws.close();
  // }, []);

  useEffect(() => {
    setMessages([
      ...messages,
      {text: newMessage, id: (Math.random() * 324).toString(10)},
    ]);
  }, [newMessage]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" />
      <Spacer margin={hp(10)} />
      {/* <MessageText
        currentMessage={{
          text: 'Hey wassup bro i love you',
        }}
      /> */}
      {/* <TabBar /> */}
      {/* <TextInput
        multiline
        onChangeText={setText}
        value={text}
        style={{
          width: wp(100),
          backgroundColor: '#27C6EF',
          fontSize: hp(4),
          fontFamily: 'Lato-Regular',
        }}
      /> */}
      {/* <TouchableOpacity
        style={{width: wp(50), height: hp(8), backgroundColor: 'black'}}
        onPress={() => {
          postMessage(text);
          setText('');
        }}>
        <Text style={{color: 'white', fontSize: wp(8), textAlign: 'center'}}>
          Send
        </Text>
      </TouchableOpacity> */}

      {/* <FlatList
        style={{flexGrow: 1, marginBottom: hp(13)}}
        keyExtractor={item => item.id}
        data={messages}
        renderItem={({item, index}) => {
          return (
            <Text
              style={{
                fontSize: wp(5),
                fontFamily: 'GalanoGrotesque-Medium',
              }}>
              {`${item.text}${'\n'}`}
            </Text>
          );
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default HomeScreen;
