import {PermissionsAndroid} from 'react-native';

export const requestDownloadPermission = async callback => {
  try {
    const granted = await PermissionsAndroid.request(
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

    // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //   console.log('Can write to external storage');
    // } else {
    //   console.log('Access to external storage denied');
    // }
    callback();
  } catch (error) {
    console.log(error);
  }
};

export const requestReadFilePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
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

    // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //   console.log('Can read external storage');
    // } else {
    //   console.log('Access to external storage denied');
    // }
  } catch (error) {
    console.log(error);
  }
};
