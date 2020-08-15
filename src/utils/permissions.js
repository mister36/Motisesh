import {PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const requestStoragePermission = async () => {
  try {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'TopCheer Storage Permission',
        message:
          'TopCheer needs access to external storage so you have access to Cheer Sessions',
        buttonNeutral: 'Ask me later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'TopCheer Storage Permission',
        message:
          'TopCheer needs access to external storage so you have access to Cheer Sessions',
        buttonNeutral: 'Ask me later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    // puts granted status into storage
    await AsyncStorage.setItem('external_storage_permission', 'true');
  } catch (error) {
    console.log(error);
  }
};
