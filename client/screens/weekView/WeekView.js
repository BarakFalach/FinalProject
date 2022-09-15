import React from 'react';
import {View} from 'react-native';
import ActivityItem from '../../components/WeekView/ActivityItem';
import {weeklyActivitiesContext} from '../../App';
import {ActivityIcons} from '../addActivity/AddActivity';

const WeekView = () => {
  const {weeklyActivities} = React.useContext(weeklyActivitiesContext);

  return (
    <View>
      {weeklyActivities.map(activity => (
        <ActivityItem
          key={activity}
          name={activity}
          icon={ActivityIcons[activity]}
        />
      ))}
    </View>
  );
};

export default WeekView;
