import React, {useContext} from 'react';
import {GroupContext} from '../App';
import axios from 'axios';
import {useUser} from '../hooks/useUser';
import {base_url} from '../utils/constants';

export const useJoinGroup = () => {
  const {setGroup} = useContext(GroupContext);
  const {user} = useUser();
  const [isLoading, setIsLoading] = React.useState(false);

  const joinGroup = async groupCode => {
    setIsLoading(true);
    const config = {
      method: 'post',
      url: `${base_url}/user/addGroup`,
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
