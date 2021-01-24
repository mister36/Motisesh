import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import jwt_decode from 'jwt-decode';
import axiosBase from './src/utils/axiosBase';

let ws = new WebSocket('ws://192.168.1.72:4000/chat');

export let postMessage = message => {
  ws.send(JSON.stringify({event: 'user_message', data: {message}}));
  // setLastMessageTime();
};

const refreshToken = async () => {
  try {
    // grabs user data from refresh token
    const token = await AsyncStorage.getItem('refreshToken');
    const userData = jwt_decode(token);
    console.log(userData);

    // sends request to update access token
    const results = await axiosBase.post('/user/token', {
      email: userData.email,
      name: userData.name,
      refreshToken: token,
    });

    // saves access token, reconnects
    await AsyncStorage.setItem('accessToken', results.data.token);
    connect();
  } catch (error) {
    console.log(error);
  }
};

const connect = () => {
  ws.close();
  ws.binaryType = 'blob';
  ws = new WebSocket('ws://192.168.1.72:4000/chat');

  ws.onopen = () => {
    console.log('Websocket connection opened');

    AsyncStorage.multiGet(['accessToken', 'wsId'], (err, results) => {
      if (err) return console.log(err);
      const [tokenArr, wsIdArr] = results;

      const jwt = tokenArr[1],
        wsId = wsIdArr[1];
      ws.send(JSON.stringify({event: 'auth', id: wsId, data: {message: jwt}}));
    });
  };

  ws.onclose = e => {
    console.log('Socket closed, will try to reconnect every 5 seconds');

    if (e.code === 4000) {
      // means jwt expired
      refreshToken();
    } else {
      setTimeout(() => {
        connect();
      }, 5000);
    }
  };

  ws.onerror = err => {
    console.log(`Socket error`);
    console.log(err);
    // ws.close();
  };
};
connect();

// const sendGreet = async () => {
//   try {
//     const lastMessageTime = await AsyncStorage.getItem('last_message_time');
//     // console.log('last_message_time: ', lastMessageTime);
//     const timeDiff = Date.now() - lastMessageTime;
//     // console.log('timeDiff: ', timeDiff);

//     // If last message was sent over 3 hours ago
//     if (lastMessageTime && timeDiff > 10800000) {
//       return true;
//     }
//     return false;
//   } catch (error) {
//     return false;
//   }
// };

export {ws};
