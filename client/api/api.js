import axios from 'axios';

const baseUrl = 'http://10.0.2.2:3000';

export const getGroup = async groupId => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'get',
    url: `${baseUrl}/group/code/${groupId}`,
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
    url: `${baseUrl}/group`,
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
    url: `${baseUrl}/steps/day`,
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
    url: `${baseUrl}/steps/month`,
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
    url: `${baseUrl}/steps/day/group`,
    params: {
      startDate,
      endDate,
    },
  };
  const response = await axios(config);
  return response.data;
};
