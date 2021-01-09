// import ReconnectingWebSocket from 'react-native-reconnecting-websocket';
import AsyncStorage from '@react-native-community/async-storage';
import str2ab from 'string-to-arraybuffer';
import {Buffer} from 'buffer';

// import WebSocketClient from './WebSocketClient';

let ws = new WebSocket('ws://192.168.1.72:4000/');
let t0;
let t1;

export let postMessage = message => {
  t0 = performance.now();
  ws.send(str2ab(message));
  // setLastMessageTime();
};

// let ws = new ReconnectingWebSocket('ws://192.168.1.72:4000/', null, {
//   reconnectInterval: 3000,
// });

const connect = () => {
  ws.close();
  ws = new WebSocket('ws://192.168.1.72:4000/');
  ws.binaryType = 'arraybuffer';

  ws.onopen = () => {
    console.log('Websocket connection opened');
    // ws.send('hiya');
  };

  ws.onmessage = message => {
    t1 = performance.now();
    console.log(`took ${t1 - t0} milliseconds`);
    console.log(message.data);
    console.log(Buffer.from(message.data).toString('utf8'));
  };

  // postMessage = message => {
  //   ws.send(message);
  // };

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

export default ws;
// export postMessage
