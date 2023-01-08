import {useContext, useEffect} from 'react';
import {getGroup} from '../api/api';
import {GroupContext, UserContext} from '../App';

export const useGroup = () => {
  const {group, setGroup} = useContext(GroupContext);
  const {user} = useContext(UserContext);
  console.log('userGroup', user.groupCode);
  useEffect(() => {
    if (!Object.keys(group).length && user.groupCode) {
      getGroup(user.groupCode).then(groupData =>
        setGroup({
          ...groupData.groupAttributes,
          leaderBoard: groupData.leaderBoard,
        }),
      );
    }
  }, []);
};
