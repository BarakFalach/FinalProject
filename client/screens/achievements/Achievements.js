import React, {useMemo} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';
import {weeklyActivitiesContext} from '../../App';
import {mockAchievements} from '../../utils/mockData';

export const ActivityIcons = {
  cycling: require('../../assets/cycling.png'),
  running: require('../../assets/running.png'),
  swimming: require('../../assets/swimming.png'),
  strength: require('../../assets/strength.png'),
  tenis: require('../../assets/tenis.png'),
};

const AchievementItem = props => {
  return (
    <TouchableScale
      style={styles.row}
      onPress={props.onPress}
      activeScale={0.9}>
      {props.children}
    </TouchableScale>
  );
};

const AchievementsScreen = ({route, navigation}) => {
  const {addWeeklyActivity} = React.useContext(weeklyActivitiesContext);
  const onClick = activityName => {
    addWeeklyActivity(activityName);
    navigation.navigate('Home', {
      activityName,
    });
  };

  const achievements = useMemo(() => mockAchievements(14), []);

  return (
    <LinearGradient colors={['#57CC99', '#22577A']} style={styles.container}>
      <View style={{padding: 10}}>
        <View style={{marginBottom: 15}}>
          <Text h3 style={{color: 'white'}}>
            Achievements
          </Text>
        </View>
        <View style={styles.container}>
          {achievements.map(activity => (
            <AchievementItem
              key={activity.id}
              children={
                <Image
                  style={{height: 60, width: 60}}
                  source={ActivityIcons[activity.icon]}
                />
              }
            />
          ))}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    width: 80,
    height: 80,
    borderWidth: 4,
    margin: 8,
    borderRadius: 10,
    borderColor: '#AAC1A3',
    backgroundColor: '#F1FAEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AchievementsScreen;
