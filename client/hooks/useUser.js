import React from 'react';
import {UserContext} from '../App';

export const useUser = () => {
  const {user, setUser} = React.useContext(UserContext);
  return {user, setUser};
};
