import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Image} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';
import {weeklyActivitiesContext} from '../../App';

export const ActivityIcons = {
  cycling: require('../../assets/cycling.png'),
  running: require('../../assets/running.png'),
  swimming: require('../../assets/swimming.png'),
  strength: require('../../assets/strength.png'),
  tenis: require('../../assets/tenis.png'),
};

const ActivityRow = props => {
  return (
    <TouchableScale
      style={styles.row}
      onPress={props.onPress}
      activeScale={0.9}>
      {props.children}
    </TouchableScale>
  );
};

const AddActivity = ({route, navigation}) => {
  const {addWeeklyActivity} = React.useContext(weeklyActivitiesContext);
  const onClick = activityName => {
    addWeeklyActivity(activityName);
    navigation.navigate('Home', {
      activityName,
    });
  };

  const activities = ['cycling', 'running', 'strength', 'swimming', 'tenis'];

  return (
    <LinearGradient colors={['#57CC99', '#22577A']} style={styles.container}>
      <View style={{padding: 10}}>
        <View style={{marginBottom: 15}}>
          <Text h3 style={{color: 'white'}}>
            Choose Activity
          </Text>
        </View>
        <View style={styles.container}>
          {activities.map(activity => (
            <ActivityRow
              key={activity}
              onPress={() => onClick(activity)}
              children={
                <Image
                  style={{height: 120, width: 120}}
                  source={ActivityIcons[activity]}
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
    width: 160,
    height: 160,
    borderWidth: 4,
    margin: 10,
    borderRadius: 10,
    borderColor: '#AAC1A3',
    backgroundColor: '#F1FAEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddActivity;
