import * as React from 'react';
import Video from 'react-native-video';
// import audioSocket from '../api/socketApi';
import PlayMusic from '../../playMusic';
import Wakeful from 'react-native-wakeful';

const SessionContext = React.createContext();

const sessionReducer = (state, action) => {
  switch (action.type) {
    case 'set_config_visible_true':
      return {...state, configVisible: true};
    case 'set_config_visible_false':
      return {...state, configVisible: false};
    case 'voice_playing_true':
      return {...state, voicePlaying: true};
    case 'voice_playing_false':
      return {...state, voicePlaying: false};
    case 'session_playing_true':
      return {...state, sessionPlaying: true};
    case 'session_playing_false':
      return {...state, sessionPlaying: false};
    case 'unpause_session':
      return {...state, sessionPaused: false};
    case 'pause_session':
      return {...state, sessionPaused: true};
    default:
      return state;
  }
};

// let wakeful = new Wakeful();

export const SessionProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(sessionReducer, {
    configVisible: false,
    voicePlaying: false,
    sessionPlaying: false,
    // sessionPaused: false,
  });

  // audioSocket.on('receiveAudio', data => {
  //   console.log('Got voice data');
  //   console.log(data);
  //   RNFetchBlob.fs
  //     .writeStream(`${RNFetchBlob.fs.dirs.DocumentDir}/voice.wav`, 'base64')
  //     .then(stream => {
  //       stream.write(data);
  //     })
  //     .then(voicePlaying(true))
  //     .catch(err => console.log(err));
  // });

  // !action functions

  // sets if GTTS voice is playing
  const voicePlaying = bool => {
    dispatch({type: `voice_playing_${bool}`});
  };

  // sets if session is playing
  const sessionPlaying = bool => {
    dispatch({type: `session_playing_${bool}`});
  };

  // const toggleSessionPaused = () => {
  //   state.sessionPaused
  //     ? dispatch({type: 'unpause_session'})
  //     : dispatch({type: 'pause_session'});
  // };

  let wakeful = new Wakeful();
  if (state.sessionPlaying) {
    wakeful.acquire();
  } else {
    wakeful.release();
  }

  return (
    <>
      {state.sessionPlaying ? <PlayMusic /> : null}
      {/* {state.sessionPlaying ? console.log('Yay i am being played') : null} */}
      {/* {!state.sessionPlaying ? console.log('true') : console.log('false')} */}
      <SessionContext.Provider value={{state, voicePlaying, sessionPlaying}}>
        {children}
      </SessionContext.Provider>
    </>
  );
};

export default SessionContext;
