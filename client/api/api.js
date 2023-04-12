import axios from 'axios';
import {base_url} from '../utils/constants';

export const getGroup = async groupId => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'get',
    url: `${base_url}/group/code/${groupId}`,
  };
  const response = await axios(config);
  return response.data;
};

export const getAllGroups = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'get',
    url: `${base_url}/group`,
  };
  const response = await axios(config);
  return response.data;
};

export const getSteps = async ({startDate, endDate}) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'get',
    url: `${base_url}/steps/day`,
    params: {
      startDate,
      endDate,
    },
  };
  const response = await axios(config);
  return response.data;
};

export const getPersonalMonth = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'get',
    url: `${base_url}/steps/month`,
  };
  const response = await axios(config);
  return response.data;
};

export const getGroupDay = async ({startDate, endDate}) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'get',
    url: `${base_url}/steps/day/group`,
    params: {
      startDate,
      endDate,
    },
  };
  const response = await axios(config);
  return response.data;
};
