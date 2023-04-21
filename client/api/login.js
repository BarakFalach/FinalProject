import axios from 'axios';
import {base_url} from '../utils/constants';

export const getSessionidUser = () => axios.get(`${base_url}/auth`);

export const signInCall = (data, headers) =>
  axios.post(`${base_url}/auth`, data, {
    headers,
  });
