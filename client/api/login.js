import axios from 'axios';
import {base_url} from '../utils/constants';

const NO_USER = 'NO_USER';

export const getSessionidUser = () => axios.get(`${base_url}/user`);

export const signInCall = (data, headers) =>
  axios.post(`${base_url}/auth`, data, {
    headers,
  });
