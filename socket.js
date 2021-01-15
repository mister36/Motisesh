import AsyncStorage from '@react-native-community/async-storage';

let ws = new WebSocket('ws://192.168.1.72:4000/chat');
let t0;
let t1;

export let postMessage = message => {
  t0 = performance.now();
  ws.send(JSON.stringify({event: 'user_message', data: {message}}));
  // setLastMessageTime();
};

const connect = () => {
  ws.close();
  ws.binaryType = 'blob';
  ws = new WebSocket('ws://192.168.1.72:4000/chat');

  ws.onopen = () => {
    console.log('Websocket connection opened');

    AsyncStorage.getItem('accessToken', (err, jwt) => {
      if (err) return console.log(err);
      ws.send(JSON.stringify({event: 'auth', data: {message: jwt}}));
    });
  };

  ws.onclose = e => {
    console.log('Socket closed, will try to reconnect every 5 seconds');
    setTimeout(() => {
      connect();
    }, 5000);
  };

  ws.onerror = err => {
    console.log(`Socket error`);
    console.log(err);
    // ws.close();
  };
};
connect();

// ws.onclose = e => {
//   console.log(e);
//   console.log('Socket closed, will try to reconnect every 5 seconds');

//     ws = new WebSocket('ws://192.168.1.72:4000/');

//   ws.onopen = () => {
//     ws.send('heartbeat');
//     console.log('Websocket connection opened');
//   };
//   ws.onmessage = (message) => {
//     console.log(message)
//   }
// };

// ws.onmessage = message => {
//   console.log(message);
// };

// ws.onclose = (e) => {
//   ws = new WebSocket('ws://192.168.1.72:4000/');

//   ws.onopen = () => {
//     ws.send('heartbeat');
//     console.log('Websocket connection opened');
//   };
//   ws.onmessage = (message) => {
//     console.log(message)
//   }
//   ws.onclose
// }

// ws.onmessage = message => {
//   console.log(message);
// };
// ws.binaryType = 'blob';

// const ws = new WebSocket('ws://192.168.1.72:4000/');

// ws.onclose = () => {
//   ws = new WebSocket('ws://192.168.1.72:4000/')
// }

// const socket = io('http://192.168.1.72:4000/', {
//   auth: async cb => {
//     cb({
//       token: await AsyncStorage.getItem('jwt_token'),
//     });
//   },
//   transports: ['websocket'],
// });

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

// // TODO: Send random token to Node JS for session persistence

// socket.on('connect', async () => {
//   console.log('Socket connection established');
//   try {
//     if (await sendGreet()) {
//       socket.emit('greet');
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// socket.on('connect_error', err => {
//   console.log(err.message);
// });

export {ws};
// export postMessage
