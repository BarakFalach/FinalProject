import React, {useContext} from 'react';
import {GroupContext} from '../App';
import axios from 'axios';
import {useUser} from '../hooks/useUser';

const PORT = '3000';
const baseUrl = `http://10.0.2.2:${PORT}/user/addGroup`;

export const useJoinGroup = () => {
  const {group, setGroup} = useContext(GroupContext);
  const {user} = useUser();
  const [isLoading, setIsLoading] = React.useState(false);

  const joinGroup = async groupCode => {
    setIsLoading(true);
    const config = {
      method: 'post',
      url: `${baseUrl}`,
      data: {
        groupCode,
        email: user.email,
      },
    };
    try {
      const response = await axios(config);
      setGroup(response.data);
    } catch (err) {
      setIsLoading(false);
    }
  };
  return {joinGroup, isLoading};
};
