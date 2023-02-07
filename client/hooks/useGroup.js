import {useContext, useEffect} from 'react';
import {getGroup} from '../api/api';
import {GroupContext, UserContext} from '../App';

export const useGroup = () => {
  const {group, setGroup} = useContext(GroupContext);
  const {user} = useContext(UserContext);
  useEffect(() => {
    console.log('useGroup useEff user', user.email);
    console.log('useGroup useEff groupCode', user?.groupCode);
    console.log('useGroup useEff group ', group);
    if (!group && user.groupCode) {
      console.log('getting group');
      getGroup(user.groupCode).then(groupData =>
        setGroup({
          ...groupData.groupAttributes,
          leaderBoard: groupData.leaderBoard,
        }),
      );
    }
  }, [group, setGroup, user]);
  return {
    group,
  };
};
