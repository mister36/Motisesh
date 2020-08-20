import create from 'zustand';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import Wakeful from 'react-native-wakeful';

let wakeful = new Wakeful();

const useSessionStore = create((set, get) => ({
  sessionPlaying: false,
  sessionPaused: false,
  voicePlaying: false,
  setVoicePlayingOnSessionPlaying: false,
  // If session should run, turn on wifi/wake lock, start foreground service, play session; if not, stop session, unpause it, remove foreground service, remove wake/wifi lock
  shouldSessionRun: async (bool = true) => {
    if (bool) {
      wakeful.acquire();
      await startForeground();
      set(state => ({sessionPlaying: true}));
    } else {
      VIForegroundService.stopService();
      wakeful.release();
      set(state => ({
        sessionPlaying: false,
        sessionPaused: false,
      }));
    }
  },
  shouldSessionPause: bool => {
    // if session should pause and voice is playing, pause session, pause voice, tell store to set voice playing next time
    if (bool && get().voicePlaying) {
      set(state => ({
        sessionPaused: true,
        voicePlaying: false,
        setVoicePlayingOnSessionPlaying: true,
      }));
      // if session should pause, pause it
    } else if (bool && !get().voicePlaying) {
      set(state => ({sessionPaused: true}));
      // if session should play and voice was playing when paused, play session and voice, take off setVoicePlayingOnSessionPlaying flag
    } else if (!bool && get().setVoicePlayingOnSessionPlaying) {
      set(state => ({
        sessionPaused: false,
        voicePlaying: true,
        setVoicePlayingOnSessionPlaying: false,
      }));
      // if session should play, play it
    } else if (!bool && !get().setVoicePlayingOnSessionPlaying) {
      set(state => ({sessionPaused: false}));
    }
  },
  shouldVoicePlay: bool => set(state => ({voicePlaying: bool})),
}));

const startForeground = async () => {
  const channelConfig = {
    id: 'cheer192',
    name: 'Cheer Session',
    description: 'Channel description',
    enableVibration: false,
    importance: 4,
  };
  VIForegroundService.createNotificationChannel(channelConfig);

  const notificationConfig = {
    channelId: 'channelId',
    id: 3456,
    title: 'Cheer Session',
    text: 'Currently playing a session',
    icon: 'ic_icon',
    priority: 1,
  };

  try {
    await VIForegroundService.startService(notificationConfig);
  } catch (error) {
    console.error(error);
  }
};

const useAuthStore = create(set => ({
  setUpComplete: false,
  setSetUpComplete: (bool = true) => set(state => ({setUpComplete: true})),
}));

export {useSessionStore, useAuthStore};
