import {useContext, useEffect} from 'react';
import {getGroup} from '../api/api';
import {GroupContext, UserContext} from '../App';

export const useGroup = () => {
  const {group, setGroup} = useContext(GroupContext);
  const {user} = useContext(UserContext);
  useEffect(() => {
    if (!group && user.groupCode) {
      getGroup(user.groupCode).then(groupData => setGroup(groupData));
    }
  }, [group, setGroup, user]);
  return {
    group,
  };
};
