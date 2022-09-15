import Chance from 'chance';

const chance = new Chance();

export const mockUsers = numberOfUsers => {
  const users = Array.apply(null, {length: numberOfUsers}).map(
    (elem, index) => ({
      id: chance.guid(),
      name: chance.name(),
      score: chance.integer({min: index * 100, max: (index + 1) * 100}),
    }),
  );
  users.push({
    id: chance.guid(),
    name: 'Barak Falach',
    score: 10458,
  });
  return users;
};

const aAchievement = iconName => {
  return {
    id: chance.guid(),
    name: chance.name(),
    score: chance.integer({min: 0, max: 100}),
    icon: iconName || chance.url(),
  };
};

export const mockAchievements = numberOfAchievements => {
  const achievements = Array.apply(null, {length: numberOfAchievements}).map(
    (elem, index) => ({
      id: chance.guid(),
      name: chance.name(),
      description: chance.paragraph(),
      icon: chance.url(),
    }),
  );
  achievements.push(aAchievement('running'));
  achievements.push(aAchievement('cycling'));
  achievements.push(aAchievement('swimming'));
  achievements.push(aAchievement('strength'));
  achievements.push(aAchievement('tenis'));

  return achievements.reverse();
};
