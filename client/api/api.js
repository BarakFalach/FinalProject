import axios from 'axios';

const baseUrl = 'http://10.0.2.2:3000';

export const helloWorld = async () => {
  const config = {
    method: 'get',
    url: `${baseUrl}/api/users/1`,
  };
  const response = await axios(config);
};

export const getGroup = async groupId => {
  console.log('api', groupId);
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
  console.log('api');
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
