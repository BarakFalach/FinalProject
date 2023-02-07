const User = require('../db/models/User');
const Group = require('../db/models/Group');

const getUser = async (user) => {
  return await User.findOne({ email: user });
};

const getGroupLeaderBoard = async (groupMembers = []) => {
  console.log( "getLeaderBoard, groupMembers:" ,groupMembers);
  const membersAggregate = groupMembers?.map(async (member) => {
    const { name, score } = await getUser(member);
    return { name, score };
  });
  const membersWithScores = await Promise.all(membersAggregate)
  return membersWithScores.sort((a, b) => b.score - a.score);
};

module.exports = {
  getGroupLeaderBoard,
};