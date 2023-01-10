import {useContext, useEffect} from 'react';
import {getGroup} from '../api/api';
import {GroupContext, UserContext} from '../App';

export const useGroup = () => {
  const {group, setGroup} = useContext(GroupContext);
  const {user} = useContext(UserContext);
  console.log('userGroup', user.groupCode);
  useEffect(() => {
    if (!group && user.groupCode) {
      console.log('useGroup', user.groupCode);
      getGroup(user.groupCode).then(groupData =>
        setGroup({
          ...groupData.groupAttributes,
          leaderBoard: groupData.leaderBoard,
        }),
      );
    }
  }, []);
  return {
    group,
  };
};
