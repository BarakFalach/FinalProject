import axios from 'axios';

const PORT = '3000';
const baseUrl = `http://localhost:${PORT}/api`;

export const helloWorld = async () => {
  const config = {
    method: 'get',
    url: `${baseUrl}/api/users/1`,
  };
  const response = await axios(config);
  console.log(response.data);
};
