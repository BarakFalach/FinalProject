import React from 'react';
import {View} from 'react-native';
import {ListItem, Avatar} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import TouchableScale from 'react-native-touchable-scale';

const ActivityItem = props => {
  return (
    <View style={{padding: 10}}>
      <ListItem
        Component={TouchableScale}
        style={{borderRadius: 10}}
        friction={90}
        tension={100}
        activeScale={0.95}
        linearGradientProps={{
          colors: ['#3C906C', '#57CC99'],
          start: {x: 1, y: 0},
          end: {x: 0.2, y: 0},
        }}
        ViewComponent={LinearGradient}>
        <Avatar rounded />
        <ListItem.Content>
          <ListItem.Title style={{color: 'white', fontWeight: 'bold'}}>
            {props.name}
          </ListItem.Title>
          <ListItem.Subtitle style={{color: 'white'}}>
            {props.date}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Icon name="chevron-right" color="white" />
      </ListItem>
    </View>
  );
};

export default ActivityItem;
