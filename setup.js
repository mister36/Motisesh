import RNFetchBlob from 'rn-fetch-blob';
import axiosInstance from './src/api/axiosBase';

export const saveSessionVideo = () => {
  // const response = await axiosInstance.get('/video');
  RNFetchBlob.config({
    fileCache: true,
  })
    .fetch('GET', 'http://192.168.1.73:4000/api/v1/video')
    .then(res => {
      console.log(`File saved to ${res.path()}`);
    });
  // RNFetchBlob.fs
  //   .writeFile(`${RNFetchBlob.fs.dirs.CacheDir}/hype.mp4`, 'base64')
  //   .then(stream => {
  //     stream.write(RNFetchBlob.base64.encode(response));
  //     return stream.close();
  //   });
};
