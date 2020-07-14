import io from 'socket.io-client';

const audioSocket = io('http://192.168.1.73:4000/audio');
audioSocket.on('connect', () => {
  console.log('CONNECTED');
});

export const getAudio = () => {
  console.log('running');
  audioSocket.emit('sendGoogleVoice', 'audio');
};

export default audioSocket;
