import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.73:4000/api/v1',
  timeout: 3000,
});

export default axiosInstance;
