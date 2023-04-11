import React from 'react';
import {UserContext} from '../App';

export const useUser = () => {
  const {user, setUser} = React.useContext(UserContext);
  const localSetUser = React.useCallback(
    userData => {
      setUser({...userData, score: userData.score + userData.todayStepCount});
    },
    [setUser],
  );
  return {user, setUser: localSetUser};
};
