import React, {useEffect, useState, useCallback} from 'react';
import {View, Text} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

// Components
import ChatMessage from '../components/ChatMessage';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

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
  }, []);

  // useEffect(() => {
  //   GiftedChat.append(messages, messages);
  // }, []);
  return (
    <View style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        // text={text}
        // onInputTextChanged={setText}
        user={{_id: 123445, name: 'Adam'}}
        onSend={messages => {
          send(messages);
        }}
        renderMessage={ChatMessage}
        showAvatarForEveryMessage
        alignTop
      />
      {/* <Text>Wassup</Text> */}
    </View>
  );
};

export default ChatScreen;
