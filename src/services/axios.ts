import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://services.marinetraffic.com/api',
});

export default instance;