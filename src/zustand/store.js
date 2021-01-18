import create from 'zustand';
import {devtools} from 'zustand/middleware';
import AsyncStorage from '@react-native-community/async-storage';

const useAuthStore = create(set => ({
  token: null, // access, not refreshToken,
  name: null,
  saveToken: token => set(state => ({token})),
  saveName: name => set(state => ({name})),
}));

export {useAuthStore};
