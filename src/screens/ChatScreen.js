import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, StatusBar, Text} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {ws, postMessage} from '../../socket';

// Components
import ChatMessage from '../components/ChatMessage';
import Input from '../components/InputToolbar';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  // Ping pong
  useEffect(() => {
    const interval = setInterval(() => {
      ws.send(JSON.stringify({event: 'ping'}));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // on new message
  useEffect(() => {
    ws.onmessage = message => {
      const response = JSON.parse(message.data);

      if (response.event !== 'pong') {
        const text = response.data.text;

        const chatMessage = [
          {
            _id: Math.random() * 3242.2134,
            text: text,
            createdAt: new Date(),
            user: {
              _id: 1,
              name: 'Moti',
            },
          },
        ];

        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, chatMessage),
        );
      }
    };

    return () => ws.close();
  }, [ws]);

  useEffect(() => {
    setMessages([
      {
        _id: 123445,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Moti',
        },
      },
    ]);
  }, []);

  const send = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    postMessage(messages[0].text);
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <GiftedChat
        messages={messages}
        user={{_id: 123445, name: 'Adam'}}
        onSend={messages => {
          send(messages);
        }}
        renderMessage={ChatMessage}
        showAvatarForEveryMessage
        alignTop
        textInputStyle={styles.textInput}
        renderInputToolbar={props => <Input {...props} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#F2F2F2',
    borderRadius: wp(10),
    fontFamily: 'Poppins-Regular',
    paddingLeft: wp(2),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default ChatScreen;
