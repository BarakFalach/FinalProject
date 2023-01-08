import React, {useContext} from 'react';
import {GroupContext} from '../App';
import axios from 'axios';

const PORT = '3000';
const baseUrl = `http://10.0.2.2:${PORT}/user/addGroup`;

export const useJoinGroup = () => {
  const {group, setGroup} = useContext(GroupContext);
  const joinGroup = groupCode => {
    const config = {
      method: 'post',
      url: `${baseUrl}`,
      data: {
        groupCode,
      },
    };
    axios(config).then(response => {
      setGroup(response.data);
    });
  };
  return {joinGroup};
};
