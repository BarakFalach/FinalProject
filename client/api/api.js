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

export const joinGroupApi = async () => {};
