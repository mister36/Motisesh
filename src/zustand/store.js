import create from 'zustand';
import {Platform} from 'react-native';
import {devtools} from 'zustand/middleware';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import MusicControl from 'react-native-music-control';
import Wakeful from 'react-native-wakeful';
import AsyncStorage from '@react-native-community/async-storage';
import BackgroundTimer from 'react-native-background-timer';

let wakeful = new Wakeful();

// 192.168.1.72:4000

/* currentSessionURL: url for session
 currentVoiceSessionURL: url for voice
 sessionName: name of session (e.g. Hero 1)
sessionPlaying: whether or not the session is active (can be paused or unpaused)
sessionPaused: whether or not session is paused
voicePlaying: whether or not the Google voice is playing
getReadyForSessionUI: whether to animate away objects on SessionScreen; this changes to true when the session first starts
 */

const getFirstName = async () => {
  try {
    const firstName = await AsyncStorage.getItem('name');
    // name = firstName;
    return firstName;
  } catch (error) {
    console.log('FIRST NAME ERROR', error);
    return 'Bob';
  }
};

let name;
const setName = async () => {
  try {
    name = await getFirstName();
  } catch (error) {
    console.log(error);
  }
};
setName();

// getFirstName();

//  const
// const name = await getFirstName();

const useSessionStore = create((set, get) => ({
  sessionUrlBase: `https://motisesh.com/api/v1/audio/background.${
    Platform.OS === 'android' ? 'opus' : 'mp3'
  }`,
  voiceUrlBase: 'https://motisesh.com/api/v1/audio/voice.mp3',
  soundUrlBase: 'https://motisesh.com/api/v1/audio/sound.mp3',
  currentSessionURL: '',
  currentVoiceSessionURL: '',
  sessionName: '',
  sessionPlaying: false,
  sessionPaused: false,
  voicePlaying: false,
  sessionEnding: false,
  setVoicePlayingOnSessionPlaying: false,
  getReadyForSessionUI: false,
  durationOfSession: 0,
  currentSessionTime: 0,
  // If session should run, turn on wifi/wake lock, start foreground service, play session; if not, stop session, unpause it, remove foreground service, remove wake/wifi lock
  shouldSessionRun: async () => {
    try {
      const sessionName = get().sessionName;
      set(
        state => ({
          sessionPlaying: true,
          currentSessionURL: `${
            get().sessionUrlBase
          }?name=${sessionName.replace(' ', '')}&genre=${getGenreFromTitle(
            sessionName,
          )}`,
          currentVoiceSessionURL: `${
            get().voiceUrlBase
          }?genre=${getGenreFromTitle(sessionName)}`,
          sessionName: sessionName,
          getReadyForSessionUI: true,
        }),
        // 'shouldSessionRun',
      );

      if (Platform.OS === 'android') {
        wakeful.acquire();
        await startForeground();
      } else {
        enableIOSMusicControls();
      }
    } catch (error) {
      console.log(error);
    }
  },
  shouldSessionPause: bool => {
    // if session should pause and voice is playing, pause session, pause voice, tell store to set voice playing next time
    if (bool && get().voicePlaying) {
      set(
        state => ({
          sessionPaused: true,
          voicePlaying: false,
          setVoicePlayingOnSessionPlaying: true,
        }),
        // 'shouldSessionPause',
      );
      // if session should pause, pause it and the voice
    } else if (bool && !get().voicePlaying) {
      set(
        state => ({sessionPaused: true, voicePlaying: false}),
        // 'shouldSessionPause',
      );
      // if session should play and voice was playing when paused, play session and voice, take off setVoicePlayingOnSessionPlaying flag
    } else if (!bool && get().setVoicePlayingOnSessionPlaying) {
      set(
        state => ({
          sessionPaused: false,
          voicePlaying: true,
          setVoicePlayingOnSessionPlaying: false,
        }),
        // 'shouldSessionPause',
      );

      // if session should play, play it
    } else if (!bool && !get().setVoicePlayingOnSessionPlaying) {
      set(
        state => ({sessionPaused: false}),
        // 'shouldSessionPause'
      );
    }
  },
  shouldSessionEnd: async () => {
    try {
      if (Platform.OS === 'android') {
        await stopForeground();
      } else {
        MusicControl.stopControl();
      }
      set(state => ({
        sessionEnding: true,
        sessionPlaying: false,
        sessionPaused: false,
        voicePlaying: false,
        durationOfSession: 0,
        currentSessionTime: 0,
        currentSessionURL: '',
        currentVoiceSessionURL: '',
        sessionName: '',
      }));
    } catch (error) {
      console.log(error);
    }
  },
  shouldVoicePlay: bool => {
    set(
      state => ({voicePlaying: bool}),
      // 'shouldVoicePlay'
    );
  },
  resetSessionUI: () => {
    set(state => ({getReadyForSessionUI: false}));
  },
  resetForNewSession: () => {
    set(state => ({sessionEnding: false, getReadyForSessionUI: false}));
  },
  testSessionAnimation: () => {
    set(state => ({getReadyForSessionUI: true}));
  },
  durationOfSessionSetter: duration => {
    set(state => ({durationOfSession: duration}));
  },
  currentSessionTimeSetter: seconds => {
    set(state => ({currentSessionTime: seconds}));
  },
  sendSessionName: sessionName => {
    set(state => ({sessionName}));
  },
}));

const enableIOSMusicControls = () => {
  MusicControl.enableControl('play', true);
  MusicControl.enableControl('pause', true);

  MusicControl.enableBackgroundMode(true);
  MusicControl.handleAudioInterruptions(true);
};

const startForeground = async () => {
  //! IMPORTANT: channelConfig.id MUST EQUAL notificationConfig.channelId OR WILL CRASH
  const channelConfig = {
    id: 'Moti-sesh',
    name: 'Moti Session',
    description: 'Motisesh foreground service',
    enableVibration: false,
    importance: 4,
  };

  const notificationConfig = {
    channelId: 'Moti-sesh',
    id: 19818,
    title: 'Moti Session',
    text: 'Currently playing a session',
    icon: 'ic_icon',
    priority: 1,
  };

  try {
    await VIForegroundService.createNotificationChannel(channelConfig);
    await VIForegroundService.startService(notificationConfig);
  } catch (error) {
    console.error(error);
  }
};

const stopForeground = async () => {
  wakeful.release();
  try {
    await VIForegroundService.stopService();
  } catch (error) {
    console.log(error);
  }
};

const getGenreFromTitle = title => {
  const titleNoSpaces = title.replace(' ', '').toLowerCase();
  if (titleNoSpaces.includes('hero')) {
    return 'hero';
  } else if (titleNoSpaces.includes('rise')) {
    return 'rise';
  }
};

const useAuthStore = create(set => ({
  setUpComplete: false,
  setSetUpComplete: (bool = true) => set(state => ({setUpComplete: true})),
}));

export {useSessionStore, useAuthStore};
