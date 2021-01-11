import axios from 'axios';

export default axios.create({
  baseURL: 'http://192.168.1.72:4001/api/v1',
  timeout: 1000,
});
