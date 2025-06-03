import axios from 'axios';
import { Platform } from 'react-native';

//const BASE_URL = 'http://192.168.0.128:3333';
const BASE_URL = 'http://10.0.2.2:3333';
//http://localhost:3333

export const api = axios.create({
  baseURL: BASE_URL,
});

export default api;