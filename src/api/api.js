import axios from 'axios';

export const request = axios.create({
  baseURL: '/data',
  headers: {},
});
