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
import ws, {postMessage} from '../../socket';
import AsyncStorage from '@react-native-community/async-storage';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

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

  // useEffect(() => {
  //   const grabToken = async () => {
  //     try {
  //       const jwtToken = await AsyncStorage.getItem('jwt_token');
  //       setToken(jwtToken);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   grabToken();
  // }, []);

  // useEffect(() => {
  //   const botMessageListener = ws.on('bot_message', message => {
  //     setNewMessage(message);
  //   });
  //   return () => ws.off('bot_message', botMessageListener);
  // }, []);

  // useEffect(() => {
  //   setMessages([
  //     ...messages,
  //     {text: newMessage, id: (Math.random() * 324).toString(10)},
  //   ]);
  // }, [newMessage]);

  return (
    <View>
      <StatusBar backgroundColor="black" />
      <TextInput
        multiline
        onChangeText={setText}
        value={text}
        style={{
          width: wp(100),
          backgroundColor: '#27C6EF',
          fontSize: hp(4),
          fontFamily: 'Lato-Regular',
        }}
      />
      <TouchableOpacity
        style={{width: wp(50), height: hp(8), backgroundColor: 'black'}}
        onPress={() => {
          postMessage(text);
          setText('');
        }}>
        <Text style={{color: 'white', fontSize: wp(8), textAlign: 'center'}}>
          Send
        </Text>
      </TouchableOpacity>

      <FlatList
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
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
